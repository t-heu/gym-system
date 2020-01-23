import Sequelize, { Model } from 'sequelize';

class Training extends Model {
  static init(sequelize) {
    super.init(
    {
      name: Sequelize.STRING,
      exercicios: Sequelize.ARRAY(Sequelize.STRING),
    },
    {
      sequelize,
    });
    
    return this;
  }
  
  static associate(models) {
    this.belongsToMany(models.Student, { foreignKey: 'training_id', through: 'student_trainings', as: 'students' });
  }
}

export default Training;

/*
static associate(models) {
  this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
}
training_id
*/