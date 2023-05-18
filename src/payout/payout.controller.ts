import {
     Body,
     Controller,
     Get,
     Logger,
     Param,
     Post,
     Delete,
     Query,
} from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutDto } from './payout.dto';
import { UserService } from '../users/user.service';
import { Payout } from './payout.entity';
import { AppointmentService } from '../appointment/appointment.service';
import { APPT_STATUSES } from '../appointment/appointment.entity'
import { UserNotificationService } from '../userNotification/userNotification.service';
import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service';
var cron = require('node-cron');
const moment = require('moment');
import { BankDetailService } from '../bankDetail/bankDetail.service';
const stripe = require("stripe")(
     process.env.STRIPE_SECRET_KEY,
     { apiVersion: "2022-08-01" }
);

@Controller('payouts')
export class PayoutController {
     cron: any;
     cron2: any;
     private log: Logger = new Logger('PayoutController');

     constructor(
          private readonly payoutService: PayoutService,
          private userService: UserService,
          private bankDetailService: BankDetailService,
          private appointmentService: AppointmentService,
          private UserNotificationService: UserNotificationService,
          private paymentHistoryService: PaymentHistoryService,
     ) {


          this.cron = cron.schedule('0 0 1 * *', async () => {
               var endDate = moment.utc().subtract(1, 'minutes');
               var month = moment.utc(endDate).month();
               var year = moment.utc(endDate).year();
               var date = moment.utc(endDate).date();
               var startDate = moment.utc().set({
                    year: year,
                    month: month,
                    date: date,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
               });
               let payouts = await this.payoutService.getPayoutWithDates(
                    startDate,
                    endDate
               );
               if (payouts.length > 0) {
                    payouts.forEach(async (payout) => {
                         let user = await this.userService.getUser(
                              payout.userId
                         );
                         let bankDetail = await this.bankDetailService.getEntry(
                              payout.userId
                         );
                         let transfer = await this.payoutService.createTransferringToConnectAccount(
                              payout,
                              user
                         );
                         if (transfer && transfer.id) {
                              await this.payoutService.createPayoutToBankAccount(
                                   payout,
                                   bankDetail,
                                   user
                              );
                         }
                    });
                    return null;
               }
          });
          if (!this.cron.running) {
               this.cron.start();
          }
          this.cron2 = cron.schedule('0 0 16 * *', async () => {
               var endDate = moment.utc().subtract(1, 'minutes');
               var startDate = moment.utc().startOf('month').startOf('day');
               let payouts = await this.payoutService.getPayoutWithDates(
                    startDate,
                    endDate
               );
               if (payouts.length > 0) {
                    payouts.forEach(async (payout) => {
                         let user = await this.userService.getUser(
                              payout.userId
                         );
                         let bankDetail = await this.bankDetailService.getEntry(
                              payout.userId
                         );
                         let transfer = await this.payoutService.createTransferringToConnectAccount(
                              payout,
                              user
                         );
                         if (transfer && transfer.id) {
                              await this.payoutService.createPayoutToBankAccount(
                                   payout,
                                   bankDetail,
                                   user
                              );
                         }
                    });
                    return null;
               }
          });
          if (!this.cron2.running) {
               this.cron2.start();
          }
     }

     @Post()
     async createPayout(@Body() payoutDto: PayoutDto): Promise<Payout> {
          await this.userService.getUser(payoutDto.userId);
          let appointment = await this.appointmentService.getBooking(
               payoutDto.appointmentId
          );
          payoutDto.floamAmount = appointment.floamAmount;
          payoutDto.totalAmount = appointment.total;
          payoutDto.studioUserAmount =
               parseFloat(appointment.total) - payoutDto.floamAmount;
          const payout = await this.payoutService.createPayout(payoutDto);
          return payout;
     }
     @Post('/payout')
     async createTransfer(@Body() body): Promise<unknown> {
          let { payouts } = body;
          payouts = await Promise.all(payouts.map(async (payout) => {
               console.log('payout :>> ', payout);
               await this.userService.getUser(payout.userId);
               let appointment = await this.appointmentService.getBooking(
                    payout.appointmentId
               );
               if (appointment.status == APPT_STATUSES.PAID) {
                    return null
               }
               payout.floamAmount = appointment.floamAmount;
               payout.totalAmount = appointment.total;
               payout.studioUserAmount =
                    parseFloat(appointment.total) - appointment.floamAmount;
               const payouts = await this.payoutService.createPayout(payout);
               let user = await this.userService.getUser(
                    payouts.userId
               );
               let bankDetail = await this.bankDetailService.getEntry(
                    payouts.userId
               );
               let transfer = await this.payoutService.createTransferringToConnectAccount(
                    payouts,
                    user
               );
               // let newPayment
               // if (transfer && transfer.id) {
               //      newPayment = await this.payoutService.createPayoutToBankAccount(
               //           payouts,
               //           bankDetail,
               //           user
               //      );
               // }
               // const transfer = await this.payoutService.transerToBank(payout, bankDetail);
               if (transfer) {
                    const paymentText = `Your payment of $${payout.studioUserAmount} from ${user.firstName} ${user.lastName} is on the way`
                    await this.UserNotificationService.createNotification(paymentText, payout.userId, 'paymentOnTheWay', payout.appointmentId);
                    await this.userService.sendPush(payout.userId, paymentText, "Payment");

                    const updateAppointment = await this.appointmentService.updatePayment(payout.appointmentId)
               }
               return payouts;
          }))
          return payouts;
     }

     @Post(':id/update')
     async updatePayout(@Param('id') id: string, @Body() body) {
          this.log.log(`processing update...`);
          let payout = await this.payoutService.update(id, body);
          return payout;
     }

     @Post('update')
     async updatePayoutByStudio(@Body() body) {
          let payout = await this.payoutService.updateByStudio(body);
          return payout;
     }
     @Get('/all')
     async getAllPayouts(@Query('userId') userId: string) {
          this.log.log('[GET] user payouts.');
          if (userId) {
               let payouts = this.payoutService.getUserPayouts(userId);
               return payouts;
          } else {
               let payouts = this.payoutService.getAllPayouts();
               return payouts;
          }
     }
     @Get('/todayPayout')
     async getAllTodayPayout() {

          const currDate = moment()
          const month = moment(currDate).month();
          const year = moment(currDate).year();
          const date = moment(currDate).date();
          const endDate = moment().set({
               year: year,
               month: month,
               date: date,
               hour: 23,
               minute: 59,
               second: 59,
               millisecond: 0,
          })
          const startDate = moment().set({
               year: year,
               month: month,
               date: date,
               hour: 0,
               minute: 0,
               second: 0,
               millisecond: 0,
          });

          const todayPayout = await this.payoutService.getPayoutWithDates(startDate, endDate);
          const allPayouts = await this.payoutService.getAllPayouts();
          const allPayments = await this.paymentHistoryService.getAllPayments();
          return {
               todayPayout,
               allPayouts,
               allPayments
          }

     }
     @Post('/allPayouts')
     async getAllPayoutsByFilter(@Body() body) {

          let payouts = this.payoutService.getAllPayoutsByFilter(body);
          return payouts;

     }


     @Post('/get_payment_intent')
     async genratePaymentLink(@Body() body) {
          let customer = await stripe.customers.create({
               'email': body.email,
               'description': body.email
          });
          // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
          const ephemeralKey = await stripe.ephemeralKeys.create(
               { customer: customer.id },
               { apiVersion: "2020-08-27" }
          );

          // Create a PaymentIntent with the payment amount, currency, and customer
          const paymentIntent = await stripe.paymentIntents.create({
               amount: body.amount * 100,
               currency: "usd",
               customer: customer.id,
               automatic_payment_methods: {
                    enabled: true,
               },
          });

          let result = {
               'result': 'Success',
               'message': 'Payment intent crerated successfully!',
               'payment_intent': paymentIntent.client_secret,
               'payment_intent_complete': paymentIntent,
               'ephemeral_key': ephemeralKey.secret,
               'customer_id': customer.id,
               'publishablekey': process.env.STRIPE_KEY,
               'secret': process.env.STRIPE_SECRET_KEY
          }
          return result;
     }


     @Get('/connect_stripe')
     async connectStripe() {
          const bcrypt = require("bcrypt");
          const salt = await bcrypt.genSalt(10);
          const data = "https://connect.stripe.com/express/oauth/authorize?redirect_uri=" + process.env.stripe_redirected_url + "&client_id=" + process.env.stripe_client_id + "&scope=read_write";
          return {
               status: "success",
               url: data
          };
     }
}
