import Student from '../models/Student';
import Training from '../models/Training';

class LinkController {
  async show(req, res) {
    // pesquisar um usuário específico com seus treinos
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
    // adicionar o treinamento ao aluno
    const { student_id } = req.params;
    const { name } = req.body;
    
    const user = await Student.findByPk(student_id);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const trai = await Training.findOne({
      where: { name }
    });
    
    await user.addTraining(trai);
    
    return res.json(trai);
  }
  
  async delete(req, res) {
    // deletar/desvincular o treino do usuário
    const { student_id } = req.params;
    const { name } = req.body;
    
    const user = await Student.findByPk(student_id);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const trai = await Training.findOne({
      where: { name }
    });
    
    await user.removeTraining(trai);
    
    return res.json({ok: true});
  }
}

export default new LinkController()