import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToUserGroup } from '../model';

@Injectable()
export class UserToUserGroupRepo {
  constructor(
    @InjectRepository(UserToUserGroup)
    private readonly repo: Repository<UserToUserGroup>,
  ) {}
}
