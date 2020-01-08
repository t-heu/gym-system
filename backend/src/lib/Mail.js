import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemaileshbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, user, pass, secure } = mailConfig;
    
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }/*: auth.user ? auth : null*/,
    });

    this.configureTemplates();
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemaileshbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
