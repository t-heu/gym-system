import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const filterName = req.query.q || '';
    const students =
      filterName !== ''
        ? await Student.findAll({
            where: { name: { [Op.substring]: filterName } },
          })
        : await Student.findAll();

    if (students.length === 0) {
      return res.status(400).json({ error: 'Student Not Found' });
    }
    
    return res.json(students);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) return res.status(400).json({ error: 'ID not found' });

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
      code: Yup.number()
        .positive()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    
    req.body.code = Math.floor(Math.random() * 9999)
    
    const { name, email, age, weight, height, code } = await Student.create(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
      code
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
      code: Yup.number().positive()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) return res.status(400).json({ error: 'Student not found' });

    const { id, name, email, age, weight, height, code } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
      code
    });
  }

  async delete(req, res) {
    const studendExists = await Student.findByPk(req.params.id);

    if (!studendExists)
      return res.status(400).json({ error: 'Student not found' });

    try {
      await Student.destroy({
        where: { id: req.params.id },
      });

      return res.json({
        success: 'Student successfully deleted',
      });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }
}

export default new StudentController();
