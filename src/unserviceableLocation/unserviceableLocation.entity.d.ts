import { BaseEntity } from '../base/base.entity';
export declare class UnserviceableLocation extends BaseEntity {
    state: string;
    city: string;
    zipCode: string;
    lat?: number;
    lng?: number;
}
