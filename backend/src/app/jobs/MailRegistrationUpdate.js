import Mail from '../../lib/Mail';

class MailRegistrationUpdate {
  get key() {
    return 'MailRegistrationUpdate';
  }

  async handle({ data }) {
    const {
      studentName,
      studentEmail,
      planTitle,
      planDuration,
      formattedDateStart,
      formattedDateEnd,
    } = data;

    await Mail.sendMail({
      to: `${studentName} <${studentEmail}>`,
      subject: 'Atualizações na sua matrícula Gympoint',
      template: 'registration-update',
      context: {
        student: studentName,
        plan: planTitle,
        duration: planDuration,
        startDate: formattedDateStart,
        endDate: formattedDateEnd,
      },
    });
  }
}

export default new MailRegistrationUpdate();
