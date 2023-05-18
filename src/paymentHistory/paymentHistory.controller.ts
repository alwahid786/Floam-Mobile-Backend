import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common'
import { PaymentHistoryService } from './paymentHistory.service'
import { paymentHistoryDto } from './paymentHistory.dto'
import { PaymentHistory } from './paymentHistory.entity'
import { paymentFilter } from './paymentHistory.filter'
import { ParsePaymentFilterPipe } from './ParsePaymentFilterPipe'
import { UserService } from '../users/user.service'
import { AppointmentService } from '../appointment/appointment.service'
@Controller('paymentHistories')
export class PaymentHistoryController {
  private log: Logger = new Logger('paymentHistoryController')

  constructor(
    private readonly paymentHistoryService: PaymentHistoryService,
    private readonly appointmentService: AppointmentService,
    private userService: UserService,
  ) { }

  @Get('users/:userId')
  async getUserPayments(@Param('userId') userId: string) {
    console.log("in users");
    this.log.log('[GET] payment which belong to user');
    await this.userService.getUser(userId);
    const userPayments = await this.paymentHistoryService.getPaymentByUser(userId);
    return (userPayments.reverse());
  }
  @Get('earnings/:userId')

  async earnings(@Param('userId') userId: string) {
    console.log("in earning");
    this.log.log('[GET] payment which belong to user');
    await this.userService.getUser(userId);
    const earnings = await this.paymentHistoryService.getEarnings(userId);
    return (earnings);
  }
  @Get('todayPayment')
  async todayPayment() {
    return await this.appointmentService.getAllAppts();

  }

}