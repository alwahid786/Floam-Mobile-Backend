import { Repository } from 'typeorm';
export default class BaseService<T> {
    private repo;
    constructor(repo: Repository<any>);
    create(item: any): Promise<any>;
    update(item: any): Promise<any>;
    delete(item: any): Promise<import("typeorm").DeleteResult>;
}
