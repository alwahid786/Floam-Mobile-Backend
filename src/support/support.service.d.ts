import { Repository } from 'typeorm';
import { supportDto } from './support.dto';
import { Support } from './support.entity';
export declare class supportService {
    private readonly supportRepo;
    private log;
    constructor(supportRepo: Repository<Support>);
    createSupport(dto: supportDto): Promise<Support>;
    getAll(): Promise<Support[]>;
}
