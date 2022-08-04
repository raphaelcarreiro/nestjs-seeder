import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PriceEntity } from 'src/database/entities/typeorm/price.entity';
import { PriceDocument } from 'src/database/schemas/mongoose/price.schema';
import { Repository } from 'typeorm';
import { SeederAbstract } from './abstract/seeder-abstract';

@Injectable()
export class PriceSeeder extends SeederAbstract<PriceEntity> {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly repository: Repository<PriceEntity>,

    @InjectModel('PriceSchema')
    private readonly model: Model<PriceDocument>,
  ) {
    super();
  }

  async execute() {
    const entities = await this.find();

    console.log(`${entities.length} encontrados`);

    await this.store(entities);
  }

  protected async find(): Promise<PriceEntity[]> {
    console.log('Buscando registros...');

    return await this.repository.find();
  }

  protected async store(entities: PriceEntity[]): Promise<void> {
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
