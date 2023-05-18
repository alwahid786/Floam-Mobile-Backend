import { BaseEntity } from '../base/base.entity';
export declare class Location extends BaseEntity {
    addressOne: string;
    addressTwo: string | null;
    state: string;
    city: string;
    zipCode: string;
    lat?: number;
    lng?: number;
}
