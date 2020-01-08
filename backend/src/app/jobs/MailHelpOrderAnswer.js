import Mail from '../../lib/Mail';

class MailHelpOrderAnswer {
  get key() {
    return 'MailHelpOrderAnswer';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Sua dúvida com a Gympoint',
      template: 'helpanswer-store',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new MailHelpOrderAnswer();
