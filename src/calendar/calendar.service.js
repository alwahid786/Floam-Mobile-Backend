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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calendar_entity_1 = require("./calendar.entity");
let CalendarService = class CalendarService {
    constructor(calendarRepo) {
        this.calendarRepo = calendarRepo;
        this.log = new common_1.Logger('CalendarService');
    }
    getByStudio(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const calendar = yield this.calendarRepo.findOne({ studioId });
            if (!calendar) {
                this.log.error(`Calendar for studio not found. studioId: ${studioId}`);
                throw new Error(`Calendar for studio not found.`);
            }
            return calendar;
        });
    }
    saveEvent(studioId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const calendar = yield this.getByStudio(studioId);
            event.index = calendar.events.length;
            calendar.events.push(event);
            return this.calendarRepo.save(calendar);
        });
    }
    removeEvent(studioId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const calendar = yield this.getByStudio(studioId);
            calendar.events = calendar.events.filter(e => e.index !== event.index);
            return this.calendarRepo.save(calendar);
        });
    }
    setupForStudio(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getByStudio(studioId);
            }
            catch (error) {
                if (error.message === 'Calendar for studio not found.') {
                    const calendar = {
                        studioId,
                        autoConfirmAppts: true,
                        events: []
                    };
                    return this.calendarRepo.save(calendar);
                }
                this.log.error(`[setupForStudio] ${error.message}`);
            }
        });
    }
    setAutoConfirmAppointment(studioId, autoConfirm) {
        return __awaiter(this, void 0, void 0, function* () {
            const calendar = yield this.getByStudio(studioId);
            calendar.autoConfirmAppts = autoConfirm;
            return this.calendarRepo.save(calendar);
        });
    }
    studioCalenders(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.calendarRepo.find({
                where: {
                    studioId: studioId
                }
            });
            return studios;
        });
    }
};
CalendarService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(calendar_entity_1.CalendarEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map