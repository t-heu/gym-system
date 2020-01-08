import mongoose from 'mongoose';

const HelpOrderNotificationsSchema = new mongoose.Schema(
  {
    helporder_id: {
      type: Number,
      required: true,
    },

    student_id: {
      type: Number,
      required: true,
    },

    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'HelpOrderNotifications',
  HelpOrderNotificationsSchema
);
