module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'checkins',
      [
        {
          student_id: 1,
          created_at: new Date('2019-11-30T17:00:00'),
          updated_at: new Date('2019-11-30T17:00:00'),
        },
        {
          student_id: 1,
          created_at: new Date('2019-12-01T17:00:00'),
          updated_at: new Date('2019-12-01T17:00:00'),
        },
        {
          student_id: 1,
          created_at: new Date('2019-12-02T17:00:00'),
          updated_at: new Date('2019-12-02T17:00:00'),
        },
        {
          student_id: 1,
          created_at: new Date('2019-12-03T17:00:00'),
          updated_at: new Date('2019-12-03T17:00:00'),
        },
        {
          student_id: 1,
          created_at: new Date('2019-12-04T17:00:00'),
          updated_at: new Date('2019-12-04T17:00:00'),
        },
        {
          student_id: 2,
          created_at: new Date('2019-12-14T17:00:00'),
          updated_at: new Date('2019-12-14T17:00:00'),
        },
        {
          student_id: 2,
          created_at: new Date('2019-12-15T17:00:00'),
          updated_at: new Date('2019-12-15T17:00:00'),
        },
        {
          student_id: 2,
          created_at: new Date('2019-12-16T17:00:00'),
          updated_at: new Date('2019-12-16T17:00:00'),
        },
        {
          student_id: 2,
          created_at: new Date('2019-12-17T17:00:00'),
          updated_at: new Date('2019-12-17T17:00:00'),
        },
        {
          student_id: 2,
          created_at: new Date('2019-12-18T17:00:00'),
          updated_at: new Date('2019-12-18T17:00:00'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('checkins', null, {});
  },
};
