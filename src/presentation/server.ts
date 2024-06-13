import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { FileSystemDatasources } from '../infrastructure/datasources/file-system.datasources';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasources';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fsLogReposiroty = new LogRepositoryImpl(new FileSystemDatasources());

const mongoLogReposiroty = new LogRepositoryImpl(new MongoLogDatasource());

const postgreLogReposiroty = new LogRepositoryImpl(new PostgresLogDatasource());

const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log('Server started!');

    //todo: enviar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogReposiroty
    // ).execute(['pabloemi1998@gmail.com','jazminafreire@gmail.com'])
    // emailService.sendEmailWithFileSystemLogs(['pabloemi1998@gmail.com','jazminafreire@gmail.com']);

    // const logs = await logReposiroty.getLog(LogSeverityLevel.low)
    // console.log(logs);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://www.google.com';
    //   new CheckServiceMultiple(
    //     [fsLogReposiroty, postgreLogReposiroty, mongoLogReposiroty],
    //     () => console.log(`${url} is ok!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
