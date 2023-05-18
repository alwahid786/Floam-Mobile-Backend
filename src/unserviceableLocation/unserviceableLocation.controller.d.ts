import { UnserviceableLocation } from './unserviceableLocation.entity';
import { UnserviceableLocationService } from './unserviceableLocation.service';
export declare class UnserviceableLocationController {
    private readonly unserviceableLocationService;
    constructor(unserviceableLocationService: UnserviceableLocationService);
    create(unserviceableLocation: UnserviceableLocation): Promise<UnserviceableLocation>;
    getAll(): Promise<UnserviceableLocation[]>;
}
