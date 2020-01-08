module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'registrations',
      [
        {
          created_by_id: 1,
          student_id: 1,
          plan_id: 1,
          start_date: new Date('2019-12-01T00:00:00'),
          end_date: new Date('2020-06-01T00:00:00'),
          price: 534,
          created_at: new Date('2019-12-01T00:00:00'),
          updated_at: new Date('2019-12-01T00:00:00'),
        },
        {
          created_by_id: 1,
          student_id: 2,
          plan_id: 2,
          start_date: new Date('2019-12-15T00:00:00'),
          end_date: new Date('2020-01-15T00:00:00'),
          price: 120,
          created_at: new Date('2019-12-15T00:00:00'),
          updated_at: new Date('2019-12-15T00:00:00'),
        },
        {
          created_by_id: 1,
          student_id: 3,
          plan_id: 3,
          start_date: new Date('2019-12-20T00:00:00'),
          end_date: new Date('2020-04-20T00:00:00'),
          price: 436,
          created_at: new Date('2019-12-18T00:00:00'),
          updated_at: new Date('2019-12-18T00:00:00'),
        },
        {
          created_by_id: 1,
          student_id: 4,
          plan_id: 1,
          start_date: new Date('2020-01-20T00:00:00'),
          end_date: new Date('2020-07-20T00:00:00'),
          price: 534,
          created_at: new Date('2019-12-18T00:00:00'),
          updated_at: new Date('2019-12-18T00:00:00'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('registrations', null, {});
  },
};
