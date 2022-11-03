import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { CreditLimitEntity } from 'src/database/entities/typeorm/credit-limit.entity';
import { Account, AccountDocument } from 'src/database/schemas/mongoose/account.schema';
import { CreditLimitDocument } from 'src/database/schemas/mongoose/credit-limit.schemas';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class CreditLimitSeeder extends SeederAbstract<CreditLimitEntity> {
  private sellerId: number;

  constructor(
    @InjectRepository(CreditLimitEntity)
    private readonly repository: Repository<CreditLimitEntity>,

    @InjectModel('AccountSchema')
    private readonly account: Model<AccountDocument>,

    @InjectModel('CreditLimitSchema')
    private readonly model: Model<CreditLimitDocument>,
  ) {
    super();

    this.sellerId = parseInt(process.env.LEGACY_LOCATION_ID);
  }

  async execute() {
    const entities = await this.find();

    console.log(CreditLimitSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<CreditLimitEntity[]> {
    console.log(CreditLimitSeeder.name, ': fetching');

    return await this.repository.find({
      where: {
        legacyLocationId: this.sellerId,
      },
    });
  }

  protected async store(entities: CreditLimitEntity[]): Promise<void> {
    const seller = await this.getSeller();

    const payload = entities.map(entity => ({
      accountLocationId: seller._id,
      cnpj: entity.documentNumber,
      value: entity.value,
      usedValue: entity.usedValue,
      availableValue: entity.availableValue,
      integrationAt: entity.createdAt,
      origin: 'SELLER',
    }));

    console.log(CreditLimitSeeder.name, ': inserting');

    await this.model.insertMany(payload);

    console.log(CreditLimitSeeder.name, ': completed\n');
  }

  private async getSeller(): Promise<Account> {
    return await this.account
      .findOne({
        legacyCodigoDistribuidor: this.sellerId,
      })
      .exec();
  }
}
