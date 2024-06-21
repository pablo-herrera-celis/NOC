import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });
      // console.log(sentInformation);
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs Del Servidor';
    const htmlBody = `
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="font-family: Arial, sans-serif;">
        <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <h2>Información Importante</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p>Estimado/a [Nombre del destinatario],</p>
                <p>Le escribimos para informarle sobre [detalle de la información].</p>
                <p>Por favor, revise los siguientes detalles:</p>
                <ul>
                    <li><strong>Fecha:</strong> [Fecha]</li>
                    <li><strong>Descripción:</strong> [Descripción]</li>
                    <li><strong>Detalles adicionales:</strong> [Detalles adicionales]</li>
                </ul>
                <p>Si tiene alguna pregunta o necesita más información, no dude en contactarnos.</p>
                <p>Gracias por su atención.</p>
                <p>Saludos cordiales,</p>
                <p>[Tu nombre o el nombre de tu empresa]</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #333; color: #fff; padding: 20px; text-align: center;">
                <p>No responda a este correo electrónico. Para cualquier consulta, por favor contacte con nosotros directamente.</p>
            </td>
        </tr>
    </table>
    `;
    const attachements: Attachement[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody,
    });
  }
}
