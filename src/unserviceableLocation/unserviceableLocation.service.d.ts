import { Repository } from 'typeorm';
import { UnserviceableLocation } from './unserviceableLocation.entity';
export declare class UnserviceableLocationService {
    private readonly unserviceableLocationRepository;
    private log;
    constructor(unserviceableLocationRepository: Repository<UnserviceableLocation>);
    create(unserviceableLocation: UnserviceableLocation): Promise<UnserviceableLocation>;
    getAll(): Promise<UnserviceableLocation[]>;
}
