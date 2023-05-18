import { Repository } from 'typeorm/index';
export declare class BaseRepository<T> extends Repository<any> {
    createOrUpdateStudio(item: any): Promise<any>;
}
