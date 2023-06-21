import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Between, LessThanOrEqual, MoreThan, Repository, Not, MoreThanOrEqual, LessThan } from 'typeorm'
import { CalendarService } from '../calendar/calendar.service'
import { CommunicationService } from '../communication/communication.service'
import { Studio } from '../studio/studio.entity'
import { SessionListDto } from '../users/SessionListDto'
import { User } from '../users/user.entity'
import { DATE_FORMAT } from '../utils/common'
import { Appointment, APPT_STATUSES } from './appointment.entity'
import { CreateAppointmentDto, GetStudioBookingsResponse } from './appointment.requests'
import moment = require('moment')
import { UserNotificationService } from '../userNotification/userNotification.service'
import { UserService } from '../users/user.service'
import { format as formatDate } from 'date-fns'
import { StudioService } from '../studio/studio.service'
import { format, formatInTimeZone } from 'date-fns-tz'
import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service'

@Injectable()
export class AppointmentService {
  private logger: Logger = new Logger('AppointmentService')

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    private readonly commsService: CommunicationService,
    private readonly calendarService: CalendarService,
    private userService: UserService,
    private UserNotificationService: UserNotificationService,
    private paymentHistoryService: PaymentHistoryService,
    private studioService: StudioService,
  ) { }

  createOrUpdate(appt: Appointment) {
    return this.appointmentRepo.save(appt)
  }

  async getBooking(appointmentId: string) {
    const appt = await this.appointmentRepo.findOne(appointmentId)
    // if (!appt) {
    //   throw new Error('Appointment not found.')
    // }
    return appt
  }

  async studioBookings(studioId: string) {
    var currentTime = moment(new Date).format();
    const appts = await this.appointmentRepo.find({
      where: {
        studioId: studioId,
        start: MoreThanOrEqual(currentTime),
        status: Not('requested')
      }
    })
    return appts
  }

  async studioCalenders(studioId: string) {
    const studioCalenders = await this.calendarService.studioCalenders(studioId);
    return studioCalenders
  }

  // todo: add function to calculate which dates in a month have appointments
  // use this for indicator

  async getBookingsOfStudio(studioId, currentDate: string, timeZone: string): Promise<GetStudioBookingsResponse> {
    const start = moment(currentDate, DATE_FORMAT).startOf('week').startOf('day')
    const end = start.clone().endOf('week').endOf('day')

    const bookings: Appointment[] = []
    const studioBookings = await this.appointmentRepo.find({
      where: {
        studioId,
        start: Between(start, end),
        cancelledAt: null,
      },
      relations: ['studio', 'user', 'addOns']
    })
    bookings.push(...studioBookings)

    this.logger.debug('\n\n')
    this.logger.debug('****** bookings found ******')
    this.logger.debug(bookings)
    this.logger.debug('****** bookings found ******\n\n')

    const groupedByStartDate: GetStudioBookingsResponse = {}
    while (start.isSameOrBefore(end)) {
      const date = start.clone().format(DATE_FORMAT)
      groupedByStartDate[date] = []
      start.add(1, 'd')
    }
    console.log("groupedByStartDate", groupedByStartDate)
    this.logger.debug(groupedByStartDate)

    console.log('timeZone :>> ', timeZone);
    bookings.forEach(booking => {
      const date = formatInTimeZone(booking.start, timeZone, 'yyyy-MM-dd') //moment(booking.start).utcOffset(zone).format(DATE_FORMAT)
      console.log('date :>> ', date);
      if (groupedByStartDate[date]) {

        groupedByStartDate[date].push(booking)
      }
    })

    this.logger.debug('\ngroupedByStartDate with bookings')
    this.logger.debug(groupedByStartDate)

    return groupedByStartDate
  }
  async getBookings(studioId, currentDate: string): Promise<GetStudioBookingsResponse> {
    const start = moment(currentDate, DATE_FORMAT).startOf('week').startOf('day')
    const end = start.clone().endOf('week').endOf('day')

    const bookings: Appointment[] = []
    const studioBookings = await this.appointmentRepo.find({
      where: {
        studioId,
        start: Between(start, end),
        cancelledAt: null,
      },
      relations: ['studio', 'user', 'addOns']
    })
    bookings.push(...studioBookings)

    this.logger.debug('\n\n')
    this.logger.debug('****** bookings found ******')
    this.logger.debug(bookings)
    this.logger.debug('****** bookings found ******\n\n')

    const groupedByStartDate: GetStudioBookingsResponse = {}
    while (start.isSameOrBefore(end)) {
      const date = start.clone().format(DATE_FORMAT)
      groupedByStartDate[date] = []
      start.add(1, 'd')
    }
    console.log("groupedByStartDate", groupedByStartDate)
    this.logger.debug(groupedByStartDate)

    bookings.forEach(booking => {
      const date = moment(booking.start).format(DATE_FORMAT)
      console.log('date :>> ', date);

      groupedByStartDate[date].push(booking)
    })

    this.logger.debug('\ngroupedByStartDate with bookings')
    this.logger.debug(groupedByStartDate)

    return groupedByStartDate
  }
  // async getBookings(studioId, currentDate: string): Promise<GetStudioBookingsResponse> {
  //   const start = moment(currentDate).utc().startOf('week').add(1, 'days')
  //   const end = start.clone().endOf('week').endOf('day').add(1, 'days')
  //   const startWeek = moment(currentDate).startOf('week')
  //   const endWeek = startWeek.clone().endOf('week');
  //   const bookings: Appointment[] = []
  //   const studioBookings = await this.appointmentRepo.find({
  //     where: {
  //       studioId,
  //       start: Between(start, end),
  //       cancelledAt: null,
  //     },
  //     relations: ['studio', 'user', 'addOns']
  //   })
  //   console.log("bookingsss", start)
  //   console.log('studioBookings :>> ', studioBookings);
  //   bookings.push(...studioBookings)

  //   this.logger.debug('\n\n')
  //   this.logger.debug('****** bookings found ******')
  //   this.logger.debug(bookings)
  //   this.logger.debug('****** bookings found ******\n\n')

  //   const groupedByStartDate: GetStudioBookingsResponse = {}
  //   while (startWeek.isSameOrBefore(endWeek)) {
  //     const date = startWeek.clone().format(DATE_FORMAT)
  //     groupedByStartDate[date] = []
  //     startWeek.add(1, 'd')
  //   }
  //   console.log("sdfsssssssssss", groupedByStartDate)
  //   this.logger.debug(groupedByStartDate)
  //   console.log("currentDate", currentDate)

  //   const zone = new Date(currentDate).getTimezoneOffset()
  //   console.log('zone :>> ', zone);
  //   bookings.forEach(booking => {
  //     console.log('booking.start :>> ', moment(booking.start).utcOffset(zone).format(DATE_FORMAT));
  //     const date = moment(booking.start).utcOffset(zone).format(DATE_FORMAT)
  //     console.log("date in booking fuction", date)
  //     // console.log("booking.start", booking)
  //     groupedByStartDate[date].push(booking)
  //   })

  //   this.logger.debug('\ngroupedByStartDate with bookings')
  //   this.logger.debug(groupedByStartDate)

  //   return groupedByStartDate
  // }

  async getBookingsForUser(user: User): Promise<SessionListDto> {
    const upComingSessions: Appointment[] = await this.appointmentRepo.find({
      where: {
        user,
        end: MoreThan(new Date()),
        // status: Not('cancelled')
      },
      order: { start: 'ASC' },
      relations: ['studio'],
    })
    this.logger.debug('*** upcoming sessions ***')
    this.logger.debug(upComingSessions)
    this.logger.debug('*** upcoming sessions ***')

    const previousSessions: Appointment[] = await this.getPreviousAppointments(user)
    this.logger.debug('*** previous sessions ***')
    this.logger.debug(upComingSessions)
    this.logger.debug('*** previous sessions ***')

    return {
      upcoming: upComingSessions,
      previous: previousSessions,
    }
  }

  getStudioBookings(studio: Studio): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: { studio },
      order: { start: 'ASC' },
      relations: ['studio', 'user']
    })
  }

  getStudioByStudioId(id: string): Promise<any> {
    return this.appointmentRepo.find({
      where: { studioId: id }
    })
  }

  async createBooking(
    data: CreateAppointmentDto,
    studio: Studio,
    user: User,
  ): Promise<string> {
    this.logger.log(`[creteBooking] ...`)
    /*
     * todo: @ade verify these
     *  - timeslot has not been booked
     *  - does not overlap with over appointments
     *  - free up time block if appointment is cancelled
     */
    const calendar = await this.calendarService.setupForStudio(studio.id)
    const { startDateTime, endDateTime, total, addOns, notes, numOfGuests, floamAmount } = data

    const start = new Date(startDateTime)
    const startTemp = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes(), start.getUTCSeconds())
    const end = new Date(endDateTime)
    const endTemp = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes(), end.getUTCSeconds())
    let appt: Appointment = {
      start: startTemp,
      end: endTemp,
      studio,
      user,
      total,
      cancelledAt: null,
      cancellationReason: '',
      artistLeftReview: false,
      hostLeftReview: false,
      addOns,
      notes,
      numOfGuests,
      status: calendar.autoConfirmAppts ? APPT_STATUSES.REQUEST : APPT_STATUSES.PENDING,
      userId: user.id,
      studioId: studio.id,
      notificationSent: false,
      isEarning: false,
      floamAmount,
      paymentIntent: null
    }

    appt = await this.createOrUpdate(appt)
    this.logger.log(`[creteBooking] appointment successfully created`)
    // await this.commsService.sendNewApptNotice(createdAppt)
    return appt.id
  }

  // Accept Booking Request Function 
  async acceptBooking(apptId: string) {
    let appt = await this.getBooking(apptId)
    const studio = await this.studioService.getStudio(appt.studioId)

    const data = await this.appointmentRepo.update(
      { id: apptId },
      { status: APPT_STATUSES.ACCEPT }
    ) 
    const text = `${studio.name} has accepted your appointment request.`
    await this.UserNotificationService.createNotification(text, appt.userId, 'appointmentAccept', apptId);
    await this.userService.sendPush(appt.userId, text, "Appointment Confirmed", apptId);
    return data; 
  }

  // Cancel Booking Request Function 
  async cancelBooking(apptId: string) {
    let appt = await this.getBooking(apptId)
    const studio = await this.studioService.getStudio(appt.studioId)

    const data = await this.appointmentRepo.update(
      { id: apptId },
      { status: APPT_STATUSES.CANCELLED }
    )
    const artistUser = await this.userService.getUser(appt.cancelledByUserId);
    const user = await this.userService.getUser(appt.userId);
    let paymentHistory = await this.paymentHistoryService.getPaymentByTransactionId(apptId);
    var startTime = moment(new Date(), 'DD-MM-YYYY hh:mm:ss');
    var endTime = moment(appt.start, 'DD-MM-YYYY hh:mm:ss');
    var hoursDiff = endTime.diff(startTime, 'hours');
    if (paymentHistory) {
      if (artistUser.id === studio.userId) {
        let refund = await this.paymentHistoryService.createRefundByIntent(paymentHistory);
        if (refund.status == 'succeeded') {
          await this.paymentHistoryService.createRefundLog(user, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
        }
      }
      else if (hoursDiff < 24 && artistUser.id != studio.userId) {
        let studioUserAmount = (3 / 100) * paymentHistory.amount;
        let artistUserAmount = paymentHistory.amount - studioUserAmount;
        let refund = await this.paymentHistoryService.createRefundByIntent(paymentHistory);
        if (refund.status == 'succeeded') { 
          await this.paymentHistoryService.createRefundLog(artistUser, studio.userId, refund, studioUserAmount, 'refund', artistUserAmount, apptId);
        }
      }
      else {
        let refund = await this.paymentHistoryService.createRefundByIntent(paymentHistory);
        if (refund.status == 'succeeded') {
          await this.paymentHistoryService.createRefundLog(artistUser, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
        }
      }
    }

    const text = `${studio.name} has cancelled your appointment request. Refund has been initiated for the same booking.`
    await this.UserNotificationService.createNotification(text, appt.userId, 'appointmentCancelled', apptId);
    await this.userService.sendPush(appt.userId, text, "Appointment Cancelled", apptId);
    return data;
  }
  getStudioBooking(studio: Studio): Promise<Appointment[]> {
    const date = moment().subtract(0, 'hours').format("YYYY-MM-DD HH:mm:ss")
    // const date = moment().subtract(24, 'hours').format("YYYY-MM-DD HH:mm:ss")
    return this.appointmentRepo.find({
      where: {
        studio, status: APPT_STATUSES.CONFIRMED,
        // TODO: test 
        createdAt: LessThan(date)
      },
      order: { start: 'ASC' },
      relations: ['studio', 'user']
    })
  }
  async getPreviousAppointments(user: User): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: {
        user,
        end: LessThanOrEqual(new Date()),
        // status: Not('cancelled')
      },
      order: { start: 'ASC' },
      relations: ['studio', 'user'],
    })
  }

  async apptsGuestNeedsToReview(user: User) {
    let appointments = await this.getPreviousAppointments(user)
    appointments = appointments.filter(a => !a.artistLeftReview)
    return (appointments.reverse())
  }

  async apptsHostNeedsToReview(studios: Studio[]) {
    let appointments: Appointment[] = []

    for (const studio of studios) {
      const studioAppts = await this.getStudioBookings(studio)
      appointments.push(...studioAppts)
    }

    appointments = appointments.filter(a => !a.hostLeftReview)
    return (appointments.reverse())
  }

  async cancelAppointmentData(
    apptId: string,
  ) {
    const data = await this.appointmentRepo.update(
      { id: apptId },
      { status: APPT_STATUSES.CANCELLED }
    )
    return data;
  }

  async cancelAppointment(
    apptId: string,
    reason: string,
    cancelledByUserId?: string,
  ) {
    let appt = await this.getBooking(apptId)

    appt.status = APPT_STATUSES.CANCELLED
    appt.cancelledAt = new Date()
    appt.cancellationReason = reason
    if (cancelledByUserId) {
      appt.cancelledByUserId = cancelledByUserId
    } else {
      appt.cancelledByUserId = appt.studioId
    }

    appt = await this.createOrUpdate(appt)

    const user = await this.userService.getUser(appt.cancelledByUserId)
    const studio = await this.studioService.getStudio(appt.studioId)
    const formattedDate = formatDate(appt.start, 'MMM dd, yyyy')
    if (user.id == studio.userId) {
      const text = `${studio.name} has cancelled your booking on ${formattedDate}. Refund has been initiated for the same booking.`
      await this.UserNotificationService.createNotification(text, appt.userId, 'appointmentCancel', appt.id);
      await this.userService.sendPush(appt.userId, text, "Appointment Cancelled", apptId);
    }
    else {
      const text = `${user.firstName} ${user.lastName} cancelled their session on ${formattedDate}.`
      await this.UserNotificationService.createNotification(text, studio.userId, 'appointmentCancel', appt.id);
      await this.userService.sendPush(studio.userId, text, "Appointment Cancelled", apptId);
    }
    // await this.commsService.sendApptCancelledNotice(appt, cancelledByUserId)
    return appt
  }

  async markApptAsConfirmed(apptId: string) {
    let appt = await this.getBooking(apptId)
    appt.status = APPT_STATUSES.CONFIRMED
    appt = await this.createOrUpdate(appt)

    const user = await this.userService.getUser(appt.userId)
    const text = `Your session has been confirmed.`
    await this.UserNotificationService.createNotification(text, user.id, 'appointmentConfirmed', appt.id);
    await this.userService.sendPush(user.id, text, "Appointment Confirmed");


    // await this.commsService.sendApptConfirmedNotice(appt)
    return appt
  }

  async getAllStudiosForAdmin() {
    const date = moment().subtract(0, 'hours').format("YYYY-MM-DD HH:mm:ss")
    // const date = moment().subtract(24, 'hours').format("YYYY-MM-DD HH:mm:ss")
    const data = await this.appointmentRepo.find({
      where: {
        status: APPT_STATUSES.CONFIRMED,
        // TODO: test
        createdAt: LessThan(date)
      }, order: { studioId: -1 }, select: ['studioId', 'id']
    });

    console.log('data :>> ', data);

    const studioIds = [...new Set(data.map(({ studioId }) => studioId))]
    return studioIds;
  }
  async getAll() {
    try {
      const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment().add(24, "hours").format("YYYY-MM-DD HH:mm:ss");
      const upComingSessions: Appointment[] = await this.appointmentRepo.find({ where: { start: Between(startDate, endDate), notificationSent: false } });
      return (upComingSessions)
    } catch (error) {
      console.log(error)
    }
  }

  async getAllAppts() {
    try {
      const date = moment().subtract(24, 'hours').format("YYYY-MM-DD HH:mm:ss")
      const data = await this.appointmentRepo.find({
        where: {
          status: APPT_STATUSES.CONFIRMED,
          // TODO: test
          createdAt: LessThan(date)
        }
      });
      return data.length
    } catch (error) {
      console.log(error)
    }
  }
  async getApptAll() {
    try {
      const startDate = moment().subtract(48, "hours").format("YYYY-MM-DD HH:mm:ss");
      //TODO:uncomment this
      //const endDate = moment().subtract(24, "hours").format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment().subtract(0, "hours").format("YYYY-MM-DD HH:mm:ss");
      console.log("dates:>>", startDate, "--", endDate)
      const bookings: Appointment[] = await this.appointmentRepo.find({ where: { end: Between(startDate, endDate), isEarning: false, status: APPT_STATUSES.PAID } });
      return (bookings)
    } catch (error) {
      console.log(error)
    }
  }

  async updateAppointment(appointment) {
    appointment.notificationSent = true;
    await this.createOrUpdate(appointment)
    return null
  }
  async updateEarningVariable(appointment) {
    appointment.isEarning = true;
    await this.createOrUpdate(appointment)
    return null
  }
  async updateAppointmentReq(appointmentId: string) {
    await this.appointmentRepo.update(
      { id: appointmentId },
      { status: APPT_STATUSES.CONFIRMED }
    )

    return null
  }
  async updatePayment(appointmentId: string) {
    await this.appointmentRepo.update(
      { id: appointmentId },
      { status: APPT_STATUSES.PAID }
    )
    return null
  }
}

