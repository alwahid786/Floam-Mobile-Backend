import { CalendarEvent } from './calendar.entity';
import { CalendarService } from './calendar.service';
export declare class CalendarController {
    private calendarService;
    private log;
    constructor(calendarService: CalendarService);
    getCalendarForStudio(studioId: string): Promise<import("./calendar.entity").CalendarEntity>;
    addEventToCalendar(studioId: string, event: CalendarEvent): Promise<import("./calendar.entity").CalendarEntity>;
    removeEventFromCalendar(studioId: string, event: CalendarEvent): Promise<import("./calendar.entity").CalendarEntity>;
    toggleAutoConfirm(studioId: string, autoConfirm: boolean): Promise<import("./calendar.entity").CalendarEntity>;
}
