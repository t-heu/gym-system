import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import authConfig from '../../config/auth';

import User from '../schemas/User';
import Student from '../models/Student';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'User not Found' });

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'invalid password' })
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
  
  async show(req, res) {
    const { id } = await Student.findOne({
      where: { code: req.body.code },
    });
  
  
    if (!id || id == null)
      return res
        .status(400)
        .json({ error: 'Student Not Found or not available' });
  
    return res.json({ id });
  }
}

export default new SessionController();
