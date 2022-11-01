import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PriceProductEntity } from 'src/database/entities/typeorm/price-product.entity';
import { PricePerMethod } from 'src/database/schemas/mongoose/price-per-method.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class PriceProductSeeder extends SeederAbstract<PriceProductEntity> {
  constructor(
    @InjectRepository(PriceProductEntity)
    private readonly repository: Repository<PriceProductEntity>,

    @InjectModel('PriceProductSchema')
    private readonly model: Model<PricePerMethod>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<PriceProductEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find({
      where: {
        locationId: 100,
      },
    });
  }

  protected async store(entities: PriceProductEntity[]): Promise<void> {
    let cont = 1;

    const total = entities.length;

    for (const entity of entities) {
      console.log(`Importando ${cont} de ${total}`);

      await this.model.create({
        paymentMethodId: null,
        pricePolicyId: null,
        accountLocationId: entity.locationId,
        sku: entity.sku,
        price: entity.price,
      });

      cont = cont + 1;
    }
  }
}
