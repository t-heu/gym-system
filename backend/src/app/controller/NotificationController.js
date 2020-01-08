import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const { studentId } = req.params;

    const notifications = await Notification.find({
      student: studentId,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findOneAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
