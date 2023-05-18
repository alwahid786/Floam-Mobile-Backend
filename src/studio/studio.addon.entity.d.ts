import { BaseEntity } from '../base/base.entity';
import { Studio } from './studio.entity';
export declare enum ADD_ON_PRICE_OPTION {
    INCLUDED = "INCLUDED",
    PER_HOUR = "PER_HOUR",
    FLAT_FEE = "FLAT_FEE"
}
export declare class StudioAddOn extends BaseEntity {
    name: string;
    description: string;
    price: number | null;
    priceOption?: ADD_ON_PRICE_OPTION;
    studioId: string;
    studio?: Studio;
}
