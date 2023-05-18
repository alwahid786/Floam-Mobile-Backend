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
exports.CalendarController = void 0;
const common_1 = require("@nestjs/common");
const calendar_service_1 = require("./calendar.service");
let CalendarController = class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.log = new common_1.Logger('CalendarController');
    }
    getCalendarForStudio(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[GET] getCalendarForStudio`);
            yield this.calendarService.setupForStudio(studioId);
            return this.calendarService.getByStudio(studioId);
        });
    }
    addEventToCalendar(studioId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[POST] addEventToCalendar`);
            yield this.calendarService.setupForStudio(studioId);
            return this.calendarService.saveEvent(studioId, event);
        });
    }
    removeEventFromCalendar(studioId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE] removeEventFromCalendar`);
            yield this.calendarService.setupForStudio(studioId);
            return this.calendarService.removeEvent(studioId, event);
        });
    }
    toggleAutoConfirm(studioId, autoConfirm) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[POST] toggleAutoConfirm`);
            yield this.calendarService.setupForStudio(studioId);
            return this.calendarService.setAutoConfirmAppointment(studioId, autoConfirm);
        });
    }
};
__decorate([
    common_1.Get('studios/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "getCalendarForStudio", null);
__decorate([
    common_1.Post('studios/:studioId/events'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "addEventToCalendar", null);
__decorate([
    common_1.Delete('studios/:studioId/events'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "removeEventFromCalendar", null);
__decorate([
    common_1.Post('studios/:studioId/auto-confirm'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Body('autoConfirm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "toggleAutoConfirm", null);
CalendarController = __decorate([
    common_1.Controller('calendars'),
    __metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarController);
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map