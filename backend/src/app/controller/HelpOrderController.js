import HelpOrder from '../models/HelpOrder';

import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      order: [['createdAt', 'DESC']],
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
