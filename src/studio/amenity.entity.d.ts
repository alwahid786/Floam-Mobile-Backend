import { BaseEntity } from '../base/base.entity';
import { Studio } from './studio.entity';
export declare class Amenity extends BaseEntity {
    isActive: boolean;
    description: string;
    iconName: string;
    studio?: Studio;
}
