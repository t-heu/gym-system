import Student from '../models/Student';

class StudentSessionController {
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

export default new StudentSessionController();
