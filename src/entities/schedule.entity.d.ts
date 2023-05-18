import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
export declare class Schedule extends BaseEntity {
    date: string;
    startTime: string;
    endTime: string;
    timezone: string;
    studio: Studio;
}
