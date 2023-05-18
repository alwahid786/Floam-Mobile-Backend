import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
export interface CalendarEvent {
    start: Date;
    end: Date;
    allDay?: boolean;
    index: number;
}
export declare class CalendarEntity extends BaseEntity {
    studioId: string;
    studio?: Studio;
    autoConfirmAppts: boolean;
    events: CalendarEvent[];
}
