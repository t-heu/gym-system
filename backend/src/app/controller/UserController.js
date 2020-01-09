import * as Yup from 'yup';
import User from '../schemas/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(400).json({ error: 'User does not exists' });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const userExists = await User.findOne({ email: req.body.email });
    
    if (userExists)
      return res.status(400).json({ error: 'User already exixts' });
    
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      /*oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .when('password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field
        )*/
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    //const user = await User.findById(req.params.id);

    //if (!user) return res.status(400).json({ error: 'User does not exixts' })
    
    console.log(req.body)
    const {id, name, email} = await 
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    //const { id, name, email } = User.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    try {
      await User.findByIdAndRemove(req.params.id)
    
      return res.json({ message: 'User successfully deleted' });
    } catch(err) {
      return res.status(400).send({ error: 'Error deleting project' })
    }
  }
}

export default new UserController();
