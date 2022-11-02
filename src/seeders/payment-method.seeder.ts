import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PaymentMethodEntity } from 'src/database/entities/typeorm/payment-method.entity';
import { PaymentMethodDocument } from 'src/database/schemas/mongoose/payment-method.schema';
import { Repository } from 'typeorm';
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

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<PaymentMethodEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find();
  }

  protected async store(entities: PaymentMethodEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.model.create({
        code: entity.code,
        name: entity.name,
        isMain: entity.isMain,
      });

      cont = cont + 1;
    }
  }
}
