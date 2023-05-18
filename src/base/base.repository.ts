import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm/index'

@Injectable()
export class BaseRepository<T> extends Repository<any> {
  createOrUpdateStudio(item: any) {
    return this.save(item)
  }
}
