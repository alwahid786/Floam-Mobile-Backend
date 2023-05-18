import { Repository } from 'typeorm';
import { CalendarEntity, CalendarEvent } from './calendar.entity';
export declare class CalendarService {
    private calendarRepo;
    private log;
    constructor(calendarRepo: Repository<CalendarEntity>);
    getByStudio(studioId: string): Promise<CalendarEntity>;
    saveEvent(studioId: string, event: CalendarEvent): Promise<CalendarEntity>;
    removeEvent(studioId: string, event: CalendarEvent): Promise<CalendarEntity>;
    setupForStudio(studioId: string): Promise<CalendarEntity>;
    setAutoConfirmAppointment(studioId: string, autoConfirm: boolean): Promise<CalendarEntity>;
    studioCalenders(studioId: string): Promise<CalendarEntity[]>;
}
