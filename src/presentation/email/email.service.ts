import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
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
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      // console.log(sentInformation);

      return false;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "System Logs";
    const htmlBody = `
      <h3>System Logs - NOC</h3>
      <p>Lorem ipsum</p>
      <p>Check attached logs</p>
    `;
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({ to, subject, attachments, htmlBody });
  }
}
