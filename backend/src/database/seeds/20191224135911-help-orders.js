module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'oopa! Vai ter festa de fim de ano na academia?',
          answer: 'Claro! Traz carne o suficiente que dê pra 20 comer.',
          answered_at: new Date('2019-11-30T17:00:00'),
          created_at: new Date('2019-11-30T14:00:00'),
          updated_at: new Date('2019-11-30T17:00:00'),
        },
        {
          student_id: 1,
          question: 'Posso levar minha crush?',
          answer: null,
          answered_at: null,
          created_at: new Date('2019-12-05T14:00:00'),
          updated_at: new Date('2019-12-05T17:00:00'),
        },
        {
          student_id: 2,
          question:
            'O que são essas seringas que sempre estão no chão do banheiro?',
          answer: null,
          answered_at: null,
          created_at: new Date('2019-11-30T14:00:00'),
          updated_at: new Date('2019-11-30T17:00:00'),
        },
        {
          student_id: 2,
          question:
            'O que são essas seringas que sempre estão no chão do banheiro?',
          answer:
            'Nada não... e se vir alguém utilizando sai de perto e não fala nada.',
          answered_at: new Date('2019-12-17T17:00:00'),
          created_at: new Date('2019-12-17T14:00:00'),
          updated_at: new Date('2019-12-17T17:00:00'),
        },
        {
          student_id: 3,
          question:
            'Eu acho a rosca direta muito pesada... tem alguma forma de amenizar a dor que eu sinto?',
          answer: null,
          answered_at: null,
          created_at: new Date('2019-12-20T14:00:00'),
          updated_at: new Date('2019-12-20T14:00:00'),
        },
        {
          student_id: 3,
          question:
            'Gente, estou aqui esperando uma resposta... será que elaguém pode se dar ao trabalho de responder minhas perguntas?',
          answer: null,
          answered_at: null,
          created_at: new Date('2019-12-20T15:00:00'),
          updated_at: new Date('2019-12-20T15:00:00'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('help_orders', null, {});
  },
};
