module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Diamond',
          duration: 6,
          price: 89,
          created_at: new Date('2019-12-01T00:00:00'),
          updated_at: new Date('2019-12-01T00:00:00'),
        },
        {
          title: 'Starter',
          duration: 1,
          price: 120,
          created_at: new Date('2019-12-01T00:00:00'),
          updated_at: new Date('2019-12-01T00:00:00'),
        },
        {
          title: 'Gold',
          duration: 4,
          price: 109,
          created_at: new Date('2019-12-01T00:00:00'),
          updated_at: new Date('2019-12-01T00:00:00'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', null, {});
  },
};
