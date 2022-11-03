import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { UserApiEntity } from 'src/database/entities/typeorm/user-api.entity';
import { AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { AuthDocument } from 'src/database/schemas/mongoose/auth.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class AuthSeeder extends SeederAbstract<UserApiEntity> {
  constructor(
    @InjectRepository(UserApiEntity)
    private readonly repository: Repository<UserApiEntity>,

    @InjectModel('AuthSchema')
    private readonly authModel: Model<AuthDocument>,

    @InjectModel('AccountSchema')
    private readonly accountModel: Model<AccountDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(AuthSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<UserApiEntity[]> {
    console.log(AuthSeeder.name, ': fetching');

    return await this.repository.find({ where: { status: true } });
  }

  protected async store(entities: UserApiEntity[]): Promise<void> {
    const sellers = (await this.accountModel.find({ accountType: 'seller' }).exec()).map(item => item.toJSON());

    const payload = entities
      .map(entity => {
        const seller = sellers.find(item => item.legacyDistribuidorID === entity.sellerId);

        if (!seller) {
          return null;
        }

        return {
          accountId: seller._id,
          password: entity.password,
          token: null,
          type: 'oauth',
          username: entity.username,
          accessRules: entity.roles.map(role => role.name),
        };
      })
      .filter(item => !!item);

    console.log(AuthSeeder.name, ': inserting');

    await this.authModel.insertMany(payload);

    console.log(AuthSeeder.name, ': completed\n');
  }
}
