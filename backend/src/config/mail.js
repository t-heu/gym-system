export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  secure: false,
  default: {
    from: 'Equipe Gympoint <noreply@gympoint.com>',
  },
};
