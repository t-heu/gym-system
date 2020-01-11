import Student from '../models/Student';
import NotiGeneralWarnings from '../jobs/NotiGeneralWarnings'

class NotificationController {
  async store({ body }, req, res) {
    const { user, token } = body
    
    const { token_push } = await Student.findOne({ where: { code: user.code }})
   
    if(token_push != token.value) {
      await Student.update({ token_push: token.value },{ where: { code: user.code }})
    }
    
    return res.json({ok: 'success'});
  }
  
  async warnings(req, res) {
    const { message } = req.body
    const students = await Student.findAll({ attributes: ['token_push']
    })
   
    NotiGeneralWarnings.noti(message, students)
    return res.json(students)
  }
}

export default new NotificationController();