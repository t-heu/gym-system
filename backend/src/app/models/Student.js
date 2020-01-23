import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        code: Sequelize.INTEGER,
        token_push: Sequelize.STRING
      },
      {
        sequelize,
      }
    );

    return this;
  }
  
  static associate(models) {
    this.belongsToMany(models.Training, { foreignKey: 'student_id', through: 'student_trainings', as: 'trainings' });
  }
}

export default Student;
