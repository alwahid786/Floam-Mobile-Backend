"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calendar_service_1 = require("../calendar/calendar.service");
const communication_service_1 = require("../communication/communication.service");
const common_2 = require("../utils/common");
const appointment_entity_1 = require("./appointment.entity");
const moment = require("moment");
const userNotification_service_1 = require("../userNotification/userNotification.service");
const user_service_1 = require("../users/user.service");
const date_fns_1 = require("date-fns");
const studio_service_1 = require("../studio/studio.service");
const date_fns_tz_1 = require("date-fns-tz");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepo, commsService, calendarService, userService, UserNotificationService, studioService) {
        this.appointmentRepo = appointmentRepo;
        this.commsService = commsService;
        this.calendarService = calendarService;
        this.userService = userService;
        this.UserNotificationService = UserNotificationService;
        this.studioService = studioService;
        this.logger = new common_1.Logger('AppointmentService');
    }
    createOrUpdate(appt) {
        return this.appointmentRepo.save(appt);
    }
    getBooking(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appt = yield this.appointmentRepo.findOne(appointmentId);
            return appt;
        });
    }
    studioBookings(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            var currentTime = moment(new Date).format();
            const appts = yield this.appointmentRepo.find({
                where: {
                    studioId: studioId,
                    start: typeorm_2.MoreThanOrEqual(currentTime),
                    status: typeorm_2.Not('requested')
                }
            });
            return appts;
        });
    }
    studioCalenders(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studioCalenders = yield this.calendarService.studioCalenders(studioId);
            return studioCalenders;
        });
    }
    getBookingsOfStudio(studioId, currentDate, timeZone) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = moment(currentDate, common_2.DATE_FORMAT).startOf('week').startOf('day');
            const end = start.clone().endOf('week').endOf('day');
            const bookings = [];
            const studioBookings = yield this.appointmentRepo.find({
                where: {
                    studioId,
                    start: typeorm_2.Between(start, end),
                    cancelledAt: null,
                },
                relations: ['studio', 'user', 'addOns']
            });
            bookings.push(...studioBookings);
            this.logger.debug('\n\n');
            this.logger.debug('****** bookings found ******');
            this.logger.debug(bookings);
            this.logger.debug('****** bookings found ******\n\n');
            const groupedByStartDate = {};
            while (start.isSameOrBefore(end)) {
                const date = start.clone().format(common_2.DATE_FORMAT);
                groupedByStartDate[date] = [];
                start.add(1, 'd');
            }
            console.log("groupedByStartDate", groupedByStartDate);
            this.logger.debug(groupedByStartDate);
            console.log('timeZone :>> ', timeZone);
            bookings.forEach(booking => {
                const date = date_fns_tz_1.formatInTimeZone(booking.start, timeZone, 'yyyy-MM-dd');
                console.log('date :>> ', date);
                if (groupedByStartDate[date]) {
                    groupedByStartDate[date].push(booking);
                }
            });
            this.logger.debug('\ngroupedByStartDate with bookings');
            this.logger.debug(groupedByStartDate);
            return groupedByStartDate;
        });
    }
    getBookings(studioId, currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = moment(currentDate, common_2.DATE_FORMAT).startOf('week').startOf('day');
            const end = start.clone().endOf('week').endOf('day');
            const bookings = [];
            const studioBookings = yield this.appointmentRepo.find({
                where: {
                    studioId,
                    start: typeorm_2.Between(start, end),
                    cancelledAt: null,
                },
                relations: ['studio', 'user', 'addOns']
            });
            bookings.push(...studioBookings);
            this.logger.debug('\n\n');
            this.logger.debug('****** bookings found ******');
            this.logger.debug(bookings);
            this.logger.debug('****** bookings found ******\n\n');
            const groupedByStartDate = {};
            while (start.isSameOrBefore(end)) {
                const date = start.clone().format(common_2.DATE_FORMAT);
                groupedByStartDate[date] = [];
                start.add(1, 'd');
            }
            console.log("groupedByStartDate", groupedByStartDate);
            this.logger.debug(groupedByStartDate);
            bookings.forEach(booking => {
                const date = moment(booking.start).format(common_2.DATE_FORMAT);
                console.log('date :>> ', date);
                groupedByStartDate[date].push(booking);
            });
            this.logger.debug('\ngroupedByStartDate with bookings');
            this.logger.debug(groupedByStartDate);
            return groupedByStartDate;
        });
    }
    getBookingsForUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const upComingSessions = yield this.appointmentRepo.find({
                where: {
                    user,
                    end: typeorm_2.MoreThan(new Date()),
                },
                order: { start: 'ASC' },
                relations: ['studio'],
            });
            this.logger.debug('*** upcoming sessions ***');
            this.logger.debug(upComingSessions);
            this.logger.debug('*** upcoming sessions ***');
            const previousSessions = yield this.getPreviousAppointments(user);
            this.logger.debug('*** previous sessions ***');
            this.logger.debug(upComingSessions);
            this.logger.debug('*** previous sessions ***');
            return {
                upcoming: upComingSessions,
                previous: previousSessions,
            };
        });
    }
    getStudioBookings(studio) {
        return this.appointmentRepo.find({
            where: { studio },
            order: { start: 'ASC' },
            relations: ['studio', 'user']
        });
    }
    getStudioByStudioId(id) {
        return this.appointmentRepo.find({
            where: { studioId: id }
        });
    }
    createBooking(data, studio, user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`[creteBooking] ...`);
            const calendar = yield this.calendarService.setupForStudio(studio.id);
            const { startDateTime, endDateTime, total, addOns, notes, numOfGuests, floamAmount } = data;
            const start = new Date(startDateTime);
            const startTemp = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes(), start.getUTCSeconds());
            const end = new Date(endDateTime);
            const endTemp = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes(), end.getUTCSeconds());
            let appt = {
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
                status: calendar.autoConfirmAppts ? appointment_entity_1.APPT_STATUSES.CONFIRMED : appointment_entity_1.APPT_STATUSES.PENDING,
                userId: user.id,
                studioId: studio.id,
                notificationSent: false,
                isEarning: false,
                floamAmount,
                paymentIntent: null
            };
            appt = yield this.createOrUpdate(appt);
            this.logger.log(`[creteBooking] appointment successfully created`);
            return appt.id;
        });
    }
    getStudioBooking(studio) {
        const date = moment().subtract(0, 'hours').format("YYYY-MM-DD HH:mm:ss");
        return this.appointmentRepo.find({
            where: {
                studio, status: appointment_entity_1.APPT_STATUSES.CONFIRMED,
                createdAt: typeorm_2.LessThan(date)
            },
            order: { start: 'ASC' },
            relations: ['studio', 'user']
        });
    }
    getPreviousAppointments(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepo.find({
                where: {
                    user,
                    end: typeorm_2.LessThanOrEqual(new Date()),
                },
                order: { start: 'ASC' },
                relations: ['studio', 'user'],
            });
        });
    }
    apptsGuestNeedsToReview(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let appointments = yield this.getPreviousAppointments(user);
            appointments = appointments.filter(a => !a.artistLeftReview);
            return (appointments.reverse());
        });
    }
    apptsHostNeedsToReview(studios) {
        return __awaiter(this, void 0, void 0, function* () {
            let appointments = [];
            for (const studio of studios) {
                const studioAppts = yield this.getStudioBookings(studio);
                appointments.push(...studioAppts);
            }
            appointments = appointments.filter(a => !a.hostLeftReview);
            return (appointments.reverse());
        });
    }
    cancelAppointmentData(apptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.appointmentRepo.update({ id: apptId }, { status: appointment_entity_1.APPT_STATUSES.CANCELLED });
            return data;
        });
    }
    cancelAppointment(apptId, reason, cancelledByUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let appt = yield this.getBooking(apptId);
            appt.status = appointment_entity_1.APPT_STATUSES.CANCELLED;
            appt.cancelledAt = new Date();
            appt.cancellationReason = reason;
            appt.cancelledByUserId = cancelledByUserId;
            appt = yield this.createOrUpdate(appt);
            const user = yield this.userService.getUser(appt.cancelledByUserId);
            const studio = yield this.studioService.getStudio(appt.studioId);
            const formattedDate = date_fns_1.format(appt.start, 'MMM dd, yyyy');
            if (user.id == studio.userId) {
                const text = `${studio.name} has cancelled your booking on ${formattedDate}. Refund has been initiated for the same booking.`;
                yield this.UserNotificationService.createNotification(text, appt.userId, 'appointmentCancel', appt.id);
                yield this.userService.sendPush(appt.userId, text, "Appointment Cancelled");
            }
            else {
                const text = `${user.firstName} ${user.lastName} cancelled their session on ${formattedDate}.`;
                yield this.UserNotificationService.createNotification(text, studio.userId, 'appointmentCancel', appt.id);
                yield this.userService.sendPush(studio.userId, text, "Appointment Cancelled");
            }
            return appt;
        });
    }
    markApptAsConfirmed(apptId) {
        return __awaiter(this, void 0, void 0, function* () {
            let appt = yield this.getBooking(apptId);
            appt.status = appointment_entity_1.APPT_STATUSES.CONFIRMED;
            appt = yield this.createOrUpdate(appt);
            const user = yield this.userService.getUser(appt.userId);
            const text = `Your session has been confirmed.`;
            yield this.UserNotificationService.createNotification(text, user.id, 'appointmentConfirmed', appt.id);
            yield this.userService.sendPush(user.id, text, "Appointment Confirmed");
            return appt;
        });
    }
    getAllStudiosForAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const date = moment().subtract(0, 'hours').format("YYYY-MM-DD HH:mm:ss");
            const data = yield this.appointmentRepo.find({
                where: {
                    status: appointment_entity_1.APPT_STATUSES.CONFIRMED,
                    createdAt: typeorm_2.LessThan(date)
                }, order: { studioId: -1 }, select: ['studioId', 'id']
            });
            console.log('data :>> ', data);
            const studioIds = [...new Set(data.map(({ studioId }) => studioId))];
            return studioIds;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
                const endDate = moment().add(24, "hours").format("YYYY-MM-DD HH:mm:ss");
                const upComingSessions = yield this.appointmentRepo.find({ where: { start: typeorm_2.Between(startDate, endDate), notificationSent: false } });
                return (upComingSessions);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllAppts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = moment().subtract(24, 'hours').format("YYYY-MM-DD HH:mm:ss");
                const data = yield this.appointmentRepo.find({
                    where: {
                        status: appointment_entity_1.APPT_STATUSES.CONFIRMED,
                        createdAt: typeorm_2.LessThan(date)
                    }
                });
                return data.length;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getApptAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = moment().subtract(48, "hours").format("YYYY-MM-DD HH:mm:ss");
                const endDate = moment().subtract(0, "hours").format("YYYY-MM-DD HH:mm:ss");
                console.log("dates:>>", startDate, "--", endDate);
                const bookings = yield this.appointmentRepo.find({ where: { end: typeorm_2.Between(startDate, endDate), isEarning: false, status: appointment_entity_1.APPT_STATUSES.PAID } });
                return (bookings);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateAppointment(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            appointment.notificationSent = true;
            yield this.createOrUpdate(appointment);
            return null;
        });
    }
    updateEarningVariable(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            appointment.isEarning = true;
            yield this.createOrUpdate(appointment);
            return null;
        });
    }
    updateAppointmentReq(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appointmentRepo.update({ id: appointmentId }, { status: appointment_entity_1.APPT_STATUSES.CONFIRMED });
            return null;
        });
    }
    updatePayment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appointmentRepo.update({ id: appointmentId }, { status: appointment_entity_1.APPT_STATUSES.PAID });
            return null;
        });
    }
};
AppointmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        communication_service_1.CommunicationService,
        calendar_service_1.CalendarService,
        user_service_1.UserService,
        userNotification_service_1.UserNotificationService,
        studio_service_1.StudioService])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map