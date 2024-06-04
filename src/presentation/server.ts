import { envs } from '../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasources } from '../infrastructure/datasources/file-system.datasources';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const LogReposiroty = new LogRepositoryImpl(
  // new FileSystemDatasources(),
  new MongoLogDatasource()
);
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


    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://wwwwww.google.com';
      new CheckService(
        LogReposiroty,
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
