import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common'
import { StudioService } from '../studio/studio.service'
import { UserService } from '../users/user.service'
import { CancelApptReq, CreateAppointmentDto, GetApptsToReviewResponse, GetStudioBookings } from './appointment.requests'
import { AppointmentService } from './appointment.service'
import { Appointment, APPT_STATUSES } from './appointment.entity'
import { PayoutService } from '../payout/payout.service'
import { UserNotificationService } from '../userNotification/userNotification.service'
var cron = require('node-cron');
import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service'
import { v1 as uuidv1 } from 'uuid'
import { PaymentService } from '../payment/payment.service'
import { UserCardService } from '../userCard/userCard.service'
import moment = require('moment')

@Controller('appointments')
export class AppointmentController {
  cron: any
  cron2: any
  private log: Logger = new Logger('AppointmentController')

  constructor(
    private studioService: StudioService,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private UserNotificationService: UserNotificationService,
    private payoutService: PayoutService,
    private paymentHistoryService: PaymentHistoryService,
    private readonly paymentService: PaymentService,
    private readonly userCardService: UserCardService,
  ) {
    //TODO: change cron time to every half an hour
    this.cron = cron.schedule('0 * * * * *', async () => {
      let appointments = await this.appointmentService.getAll();
      if (appointments.length > 0) {
        for (var appointment of await appointments) {
          await this.appointmentService.updateAppointment(appointment);
          const studio = await this.studioService.getStudio(appointment.studioId);
          let now = new Date()
          let studio_date = new Date(studio.studioOpen)
          let hour = studio_date.getTime() - now.getTime();
          let seconds = Math.floor(hour / 1000);
          let minutes = Math.floor(seconds / 60);
          let hours = Math.floor(minutes / 60);
          let totalHours;
          if (hours < 1) {
            totalHours = "a few";
          } else {
            totalHours = hours;
          }
          const text = `You have an upcoming session at ${studio.name} in ${totalHours} hours`
          await this.UserNotificationService.createNotification(text, appointment.userId, 'upcomingAppointment', appointment.id);
          await this.userService.sendPush(appointment.userId, text, "Upcoming Session");
        }
        return null
      }
    });
    if (!this.cron.running) {
      this.cron.start();
    }
    this.cron2 = cron.schedule('0 * * * * *', async () => {
      // console.log("cron for received payment history")
      // console.log("cron for received payment history")
      let appointments = await this.appointmentService.getApptAll();
      // console.log("appointment for>>", appointments)
      if (appointments.length > 0) {
        for (var appointment of await appointments) {
          await this.appointmentService.updateEarningVariable(appointment);
          const studio = await this.studioService.getStudio(appointment.studioId);
          const user = await this.userService.getUser(studio.userId)
          let studioUserAmount = parseFloat(appointment.total) - appointment.floamAmount;

          const paymentText = `You have recieved payment of $${studioUserAmount} from ${user.firstName} ${user.lastName}`
          await this.UserNotificationService.createNotification(paymentText, user.id, 'paymentRecieved', appointment.id);
          await this.userService.sendPush(user.id, paymentText, "Payment Received");

          await this.paymentHistoryService.createPaymentLog(user, null, studioUserAmount, 'managerAmount', appointment.id);
        }
        return null
      }
    });
    if (!this.cron2.running) {
      this.cron2.start();
    }
  }
  @Get('/cancleAppointments')
  async cancelAppointments(@Query('apptId') apptId: string) {
    const data = await this.appointmentService.cancelAppointmentData(apptId);
    if (data)
      return true
    return false
  }
  @Get('/studios')
  async getStudioBookings(@Query() studioBookingsRequest: GetStudioBookings) {
    const { userId, currentDate, studioId, timeZone } = studioBookingsRequest
    console.log("inside studios userId, currentDate, studioId", userId, currentDate, studioId)
    // const user = await this.userService.getUser(userId)
    const studio = await this.studioService.getStudio(studioId)
    // const studios = await this.studioService.getStudiosByUser(user)

    const data = await this.appointmentService.getBookingsOfStudio(studio.id, currentDate, timeZone)
    return data
  }

  @Get('/studios/:studioId')
  async getAllStudioBookings(@Param('studioId') studioId: string) {
    const studio = await this.studioService.getStudio(studioId)
    return this.appointmentService.getStudioBookings(studio)
  }
  @Get('/studio/:studioId')
  async getAllStudioBooking(@Param('studioId') studioId: string) {
    const studio = await this.studioService.getStudio(studioId)
    let data = await this.appointmentService.getStudioBooking(studio);
    data = await Promise.all(data.map(async (item) => {
      item['paymentHistory'] = await this.paymentHistoryService.getPaymentByTransactionId(item.id);
      return item
    }))
    // const data = await Promise.all((await appointments).map(async (item) => {
    //   if (item.status == APPT_STATUSES.PAID) {
    //     item['transactionId'] = await this.payoutService.getPayoutOfAppointment(item.id);

    //   }
    //   return item
    // }));
    return data;
  }

  @Post()
  async reserveStudio(@Body() data: CreateAppointmentDto) {
    this.log.log('[POST] reserve studio')
    const { studioId, userId, startDateTime, endDateTime, paymentIntent } = data
    if (startDateTime > endDateTime) {
      return null;
    }
    const studio = await this.studioService.getStudio(studioId)
    const studioUser = await this.userService.getUser(studio.userId)
    const user = await this.userService.getUser(userId)
    let uuid = await uuidv1();
    let paymentHistory = null;
    data.floamAmount = (20 / 100) * parseInt(data.total);
    let studioUserAmount = parseInt(data.total) - data.floamAmount;
    // let charge = await this.paymentHistoryService.createCharge(data, uuid);
    // return paymentIntent;
    if (paymentIntent) {
      paymentHistory = await this.paymentHistoryService.createPaymentLog(user, paymentIntent, data.total, null, null);
    }
    else {
      paymentHistory = await this.paymentHistoryService.createPaymentLog(user, null, data.total, null, null);
      // return ('Payment Issue: Transaction Failed');
    }

    let apptId = await this.appointmentService.createBooking(data, studio, user);
    paymentHistory.appointmentId = apptId;
    await this.paymentHistoryService.saveAppointmentId(paymentHistory);

    const text = `${user.firstName} ${user.lastName} has requested to book your Studio`
    await this.UserNotificationService.createNotification(text, studioUser.id, 'appointmentRequest', apptId);
    await this.userService.sendPush(studioUser.id, text, "appointmentRequest", apptId);
    // const paymentText = `You have recieved payment of $${studioUserAmount} from ${user.firstName} ${user.lastName}`
    //  await this.UserNotificationService.createNotification(paymentText, studio.userId, 'paymentRecieved', apptId);
    return 'Reservation request made successfully!'

  }

  @Post('/accept-reject/:apptId/:status')
  async acceptRejectSession(@Param('apptId') apptId: string, @Param('status') status: string) {
    if (status === 'accept') {
      let status = this.appointmentService.acceptBooking(apptId)
      await this.UserNotificationService.changeNotificationStatus(apptId, 'accept');
      return "Appointment Request Accepted Successfully!"
    } else if (status === 'reject') {
      let status = this.appointmentService.cancelBooking(apptId)
      await this.UserNotificationService.changeNotificationStatus(apptId, 'reject');
      return "Appointment request Cancelled Successfully!"
    }
  }

  // get appointments without review
  @Get('/users/:userId')
  async getApptsToReview(
    @Param('userId') userId: string
  ): Promise<GetApptsToReviewResponse> {
    // group by reviews to leave for guest and host
    const user = await this.userService.getUser(userId)
    const studios = await this.studioService.getStudiosByUser(user)

    const asGuest = await this.appointmentService.apptsGuestNeedsToReview(user)
    const asHost = await this.appointmentService.apptsHostNeedsToReview(studios)

    return { asGuest, asHost }
  }

  @Post('/cancel')
  async cancelAppointment(@Body() body: CancelApptReq): Promise<Appointment> {
    this.log.log(`processing cancel appointment ...`)
    const { apptId, reason, cancelledByUserId } = body
    await this.appointmentService.cancelAppointment(apptId, reason, cancelledByUserId);
    let appt = await this.appointmentService.getBooking(apptId);
    let studio = await this.studioService.getStudio(appt.studioId);
    const artistUser = await this.userService.getUser(cancelledByUserId);
    const user = await this.userService.getUser(appt.userId);
    let paymentHistory = await this.paymentHistoryService.getPaymentByTransactionId(apptId);
    var startTime = moment(new Date(), 'DD-MM-YYYY hh:mm:ss');
    var endTime = moment(appt.start, 'DD-MM-YYYY hh:mm:ss');
    var hoursDiff = endTime.diff(startTime, 'hours');
    if (paymentHistory) {
      if (artistUser.id === studio.userId) {
        let refund = await this.paymentHistoryService.createRefund(paymentHistory);
        if (refund.status == 'succeeded') {
          await this.paymentHistoryService.createRefundLog(user, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
        }
      }
      else if (hoursDiff < 24 && artistUser.id != studio.userId) {
        let studioUserAmount = (3 / 100) * paymentHistory.amount;
        let artistUserAmount = paymentHistory.amount - studioUserAmount;
        let refund = await this.paymentHistoryService.createRefund(paymentHistory);
        if (refund.status == 'succeeded') {
          await this.paymentHistoryService.createRefundLog(artistUser, studio.userId, refund, studioUserAmount, 'refund', artistUserAmount, apptId);
        }
      }
      else {
        let refund = await this.paymentHistoryService.createRefund(paymentHistory);
        if (refund.status == 'succeeded') {
          await this.paymentHistoryService.createRefundLog(artistUser, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
        }
      }
    }
    return appt
  }

  @Post(':apptId/confirm')
  confirmAppointment(@Param('apptId') apptId: string): Promise<Appointment> {
    this.log.log(`processing confirm appointment ...`)
    return this.appointmentService.markApptAsConfirmed(apptId)
  }

  @Post('/create/token') async createChatReport(
    @Body('cardNumber') cardNumber: string,
    @Body('expMonth') expMonth: string,
    @Body('expYear') expYear: string,
    @Body('cvc') cvc: string,
  ) {
    const data = {
      cardNumber: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc
    };
    let token = await this.paymentHistoryService.createCardToken(data);
    return token
  }

  @Get('/getTimings/:studioId')
  async getTimings(@Param('studioId') studioId: string) {
    let timings = [];
    let studio = await this.studioService.getStudio(studioId);
    const studioBookings = await this.appointmentService.studioBookings(studio.id);
    const studioCalenders = await this.appointmentService.studioCalenders(studio.id);
    if (studioCalenders && studioCalenders.length > 0) {
      for (var studioCalender of studioCalenders) {
        if (studioCalender.events && studioCalender.events.length > 0) {
          for (var event of studioCalender.events) {
            let data = {
              startTime: event.start,
              endTime: event.end
            }
            timings.push(data)
          }
        }
      }
    }
    if (studioBookings && studioBookings.length > 0) {
      for (var studioBooking of studioBookings) {
        let model = {
          startTime: new Date(studioBooking.start),
          endTime: new Date(studioBooking.end)
        }
        timings.push(model)
      }
    }
    return timings
  }
}
