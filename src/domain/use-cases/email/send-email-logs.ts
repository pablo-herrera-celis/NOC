import { EmailService } from '../../../presentation/email/email-service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(private readonly EmailService: EmailService, private readonly LogRepository: LogRepository) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.EmailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error('Email log not sent');
      }
      const log = new LogEntity({
        message: `Log Email Sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email-logs.ts',
      });
      this.LogRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs.ts',
      });
      this.LogRepository.saveLog(log);
      return false;
    }
  }
}
