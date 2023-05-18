import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export default class BaseService<T> {
  private repo: Repository<T>

  constructor(repo: Repository<any>) {
    this.repo = repo
  }

  create(item: any) {
    return this.repo.save(item)
  }

  update(item: any) {
    return this.repo.save(item)
  }

  delete(item: any) {
    return this.repo.delete(item)
  }
}
