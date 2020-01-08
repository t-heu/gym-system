import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  isWithinInterval,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  isToday,
} from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Registration from '../models/Registration';

class CheckinController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { id } = req.params;

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: [['createdAt', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { id } = req.params;

    /**
     * Check if Student Exists
     */

    const student = await Student.findByPk(id);

    if (!student)
      return res.status(400).json({ error: 'Student not registered' });

    /**
     * Check if Student is registered
     * at checkin
     */

    const registration = Registration.findAll({ where: { student_id: id } });

    const checkRegistration = await registration.map(register => {
      return isWithinInterval(new Date(), {
        start: startOfDay(register.start_date),
        end: endOfDay(register.end_date),
      });
    });

    if (checkRegistration.includes(false))
      return res
        .status(400)
        .json({ error: 'Student does not have a valid register' });

    /**
     * Check if Student has
     * 5 checkins in a week
     */

    const dateNow = new Date();
    // semana começa segunda e acaba sábado 
    const countCheckin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startOfWeek(dateNow, {weekStartsOn: 1}), endOfWeek(dateNow)],
        },
      },
    });
    
    // verifica se fez checkin hj
    if(countCheckin.length != 0) {
      if (countCheckin.map(c => isToday(c.dataValues.createdAt))) {
        return res
          .status(400)
          .json({ error: 'Student already checked in Today' });
      }
    }
    
    if (countCheckin.length >= 6) {
      return res
        .status(400)
        .json({ error: 'Student already checked in 6 times this week' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });
    
    return res.json({ checkin });
  }
}

export default new CheckinController();
