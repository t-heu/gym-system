import * as Yup from 'yup';
import { addMonths, parseISO, isWithinInterval, format } from 'date-fns';
import { Op } from 'sequelize';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import NotiRegistrationUpdate from '../jobs/NotiRegistrationUpdate'
import Queue from '../../lib/Queue';
import Notification from '../schemas/Notification';
import MailRegistrationStore from '../jobs/MailRegistrationStore';
import MailRegistrationUpdate from '../jobs/MailRegistrationUpdate';

class RegistrationController {
  async index(req, res) {
    const register = await Registration.findOne({
      where: { id: req.params.id },
    });

    return res.json(register);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const createdById = req.userId;
    const { student_id, start_date, plan_id } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    /**
     * Check if Student is
     * already registered at start_date
     */

    const getRegisters = Registration.findAll({ where: { student_id } });

    const checkRegistration = await getRegisters.map(registration => {
      return isWithinInterval(parseISO(start_date), {
        start: registration.start_date,
        end: registration.end_date,
      });
    });

    if (checkRegistration.includes(true))
      return res
        .status(400)
        .json({ error: 'User Already Registered on this date' });

    const { duration, price, title } = await Plan.findByPk(plan_id);
    const endDate = addMonths(parseISO(start_date), duration);
    const priceTotal = price * duration;

    const registration = await Registration.create({
      created_by_id: createdById,
      student_id,
      start_date,
      plan_id,
      end_date: endDate,
      price: priceTotal,
    });

    /**
     * Notify Register Creation to User
     */

    const formattedDateStart = format(parseISO(start_date), "dd'/'MM'/'yyyy");
    const formattedDateEnd = format(endDate, "dd'/'MM'/'yyyy");

    await Notification.create({
      notification_type: 'store',
      register_start: formattedDateStart,
      register_end: formattedDateEnd,
      student: registration.student_id,
    });

    await Queue.add(MailRegistrationStore.key, {
      studentName: studentExists.name,
      studentEmail: studentExists.email,
      planTitle: title,
      planDuration: duration,
      formattedDateStart,
      formattedDateEnd,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { id } = req.params;

    const register = await Registration.findByPk(id);

    if (!register) {
      return res.status(400).json({ error: 'Register not found.' });
    }

    let { plan_id, start_date } = req.body;

    if (!plan_id) {
      plan_id = register.plan_id;
    }

    if (!start_date) {
      start_date = register.start_date;
    }

    const { duration, price, title } = await Plan.findByPk(plan_id);
    const student = await Student.findByPk(register.student_id);
    const endDate = addMonths(parseISO(start_date), duration);
    const priceTotal = price * duration;

    const newRegister = await register.update({
      start_date,
      end_date: endDate,
      plan_id,
      price: priceTotal,
    });

    /**
     * Notify Register Update to User
     */

    const formattedDateStart = format(parseISO(start_date), "dd'/'MM'/'yyyy");
    const formattedDateEnd = format(endDate, "dd'/'MM'/'yyyy");

    await Notification.create({
      notification_type: 'update',
      register_start: formattedDateStart,
      register_end: formattedDateEnd,
      student: register.student_id,
    });

    await Queue.add(MailRegistrationUpdate.key, {
      studentName: student.name,
      studentEmail: student.email,
      planTitle: title,
      planDuration: duration,
      formattedDateStart,
      formattedDateEnd,
    });

    await NotiRegistrationUpdate.noti()

    return res.json(newRegister);
  }

  async delete(req, res) {
    const registerExists = await Registration.findByPk(req.params.id);

    if (!registerExists)
      return res.status(400).json({ error: 'Register not found' });

    await Registration.destroy({
      where: { id: req.params.id },
    });

    return res.json({
      success: 'Register successfully deleted',
    });
  }

  async show(req, res) {
    const filterName = req.query.q || '';

    const registers = filterName !== '' ? await Registration.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          where: { name: { [Op.substring]: filterName } },
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    }) : await Registration.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registers);
  }
}

export default new RegistrationController();
