import nodemailer from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface SmtpServerParams {
  host?:     string,
  port?:     string,
  user?:     string,
  password?: string
}

export interface MailParams {
  from?:    string,
  to?:      string,
  subject?: string,
  html?:    string
}

const getSmtpTransporter = (params: SmtpServerParams): nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {
  return nodemailer.createTransport({
    host: params.host,
    port: params.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: params.user, //testAccount.user, // generated ethereal user
      pass: params.password, //testAccount.pass // generated ethereal password
    },
    tls: {
      ciphers:'SSLv3'
    }
  });
};

const sendMail = async (serverParams: SmtpServerParams, mailParams: MailParams) => {
  let transporter = getSmtpTransporter(serverParams);
  let info: SMTPTransport.SentMessageInfo = await transporter.sendMail(mailParams);

  if (info.accepted) {
    const receiverEmail: string = String(info.accepted[0]);
    console.log('receiverEmail', receiverEmail, mailParams.from);
  }

  console.log('A', serverParams);
  console.log('B', mailParams);

  console.log('response', info.response, info.accepted);
}

const Mailer = {
  sendMail
};

export default Mailer;
