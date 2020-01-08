import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const planList = await Plan.findAll();

    if (!planList) return res.status(400).json({ error: 'No Plans available' });

    return res.json(planList);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan)
      return res.status(400).json({ erro: 'No plan found with given id' });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      price: Yup.number(),
      duration: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan not Found' });

    await plan.update(req.body);

    return res.json({ id: req.params.id, ...req.body });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan not Found' });

    await Plan.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Plan successfuly deleted' });
  }
}

export default new PlanController();
