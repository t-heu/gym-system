import Mail from '../../lib/Mail';

class MailRegistrationStore {
  get key() {
    return 'MailRegistrationStore';
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
      subject: 'Dados da sua matrícula Gympoint',
      template: 'registration-store',
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

export default new MailRegistrationStore();
