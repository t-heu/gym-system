import Training from '../models/Training';
import { Op } from 'sequelize';

class TrainingController {
  async index(req, res) {
    const filterName = req.query.q || '';
    
    const trainings =
      filterName !== '' ?
      await Training.findAll({
        where: { name: {
          [Op.substring]: filterName 
        } },
      }) :
      await Training.findAll();
    
    if (trainings.length === 0) {
      return res.status(400).json({ error: 'Student Not Found' });
    }
    
    return res.json(trainings)
  }
  
  async show(req, res) {
    const training = await Training.findByPk(req.params.id);
    
    if (!training) return res.status(400).json({ error: 'ID not found' });
    
    return res.json(student);
  }
  
  async store(req, res) {
    const { name, exe } = req.body;
    
    const training = await Training.findOne({name});
    
    if (!training) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const trai = await Training.create({ 
      name, 
      exercicios: exe.split(',').map(te => te.trim())
    });
    
    return res.json(trai);
  }
  
  async update(req, res) {
    const { exe, name } = req.body
    const training = await Training.findByPk(req.params.id);
    
    let objForUpdate = {};
    
    if (!training) return res.status(400).json({ error: 'Training not Found' });
    
    if (exe) objForUpdate.exercicios = exe.split(',').map(te => te.trim());
    if (name) objForUpdate.name = name;
    
    const trai = await training.update(objForUpdate)
    
    return res.json(trai);
  }
  
  async delete(req, res) {
    const training = await Training.findByPk(req.params.student_id);
    
    if (!training) return res.status(400).json({ error: 'Plan not Found' });
    
    await Training.destroy({ where: { id: req.params.student_id } });
    
    return res.json({ message: 'Training successfuly deleted' });
  }
}

export default new TrainingController()