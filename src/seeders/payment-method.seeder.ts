import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PaymentMethodEntity } from 'src/database/entities/typeorm/payment-method.entity';
import { PaymentMethodDocument } from 'src/database/schemas/mongoose/payment-method.schema';
import { In, Not, Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class PaymentMethodSeeder extends SeederAbstract<PaymentMethodEntity> {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly repository: Repository<PaymentMethodEntity>,

    @InjectModel('PaymentMethodSchema')
    private readonly model: Model<PaymentMethodDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(PaymentMethodSeeder.name, `: ${entities.length} records`);

    await this.store(entities);
  }

  protected async find(): Promise<PaymentMethodEntity[]> {
    const mongoPaymentMethods = await this.model.find();

    console.log(PaymentMethodSeeder.name, ': fetching');

    return await this.repository.find({
      where: {
        code: Not(In(mongoPaymentMethods.map(item => item.code))),
      },
    });
  }

  protected async store(entities: PaymentMethodEntity[]): Promise<void> {
    const payload = entities.map(entity => ({
      code: entity.code,
      name: entity.name,
      isMain: entity.isMain,
    }));

    console.log(PaymentMethodSeeder.name, ': inserting');

    await this.model.insertMany(payload);

    console.log(PaymentMethodSeeder.name, ': completed\n');
  }
}
