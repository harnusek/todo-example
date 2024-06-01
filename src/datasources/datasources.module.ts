import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LocalDataSource } from './ormconfig';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await LocalDataSource.initialize();
        return LocalDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
