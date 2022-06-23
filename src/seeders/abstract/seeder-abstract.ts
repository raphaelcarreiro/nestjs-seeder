export abstract class SeederAbstract<TypeORMEntity> {
  public abstract execute(): Promise<void>;
  protected abstract find(): Promise<TypeORMEntity[]>;
  protected abstract store(entities: TypeORMEntity[]): Promise<void>;
}
