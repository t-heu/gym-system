import Student from '../models/Student';
import Training from '../models/Training';

class TrainingController {
  async show(req, res) { // pesquisa um específico
    const { student_id } = req.params;
    
    const user = await Student.findByPk(student_id, {
      include: {
        association: 'trainings',
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
    
    return res.json(user);
  }
  
  async store(req, res) {
    const { student_id } = req.params;
    const { name, exe } = req.body;
    
    const user = await Student.findByPk(student_id);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const trai = await Training.create({ 
      name, 
      exercicios: exe.split(',').map(te => te.trim())
    });
    //console.log(trai)
    await user.addTraining(trai);
    
    return res.json(trai);
  }
  
  async update(req, res) {
    
  }
  
  async delete(req, res) {
    
  }
}

export default new TrainingController()