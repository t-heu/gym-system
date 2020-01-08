import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderNotifications from '../schemas/HelpOrderNotifications';

//import Queue from '../../lib/Queue';
import MailHelpOrderAnswer from '../jobs/MailHelpOrderAnswer';

class HelpAnswerController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name', 'email'],
      },
    });

    if (helpOrders.length === 0)
      return res.status(400).json({ error: 'No new help-orders' });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { id } = req.params;

    const userExists = Student.findByPk(id);

    if (!userExists)
      return res.status(400).json({ error: 'User Does not Exists' });

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: id,
        answer: null,
      },
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name', 'email'],
      },
    });

    if (helpOrders.length === 0)
      return res
        .status(400)
        .json({ error: 'No Help-Orders registered for this user' });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { id } = req.params;

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findOne({
      where: {
        id,
      },
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name', 'email'],
      },
    });

    if (!helpOrder)
      return res.status(400).json({ error: 'Help Order does not exists' });

    helpOrder.answer = answer;
    helpOrder.answered_at = new Date();

    helpOrder.save();

    await HelpOrderNotifications.create({
      helporder_id: id,
      student_id: helpOrder.student_id,
    });

    //await Queue.add(MailHelpOrderAnswer.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpAnswerController();
