import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    notification_type: {
      type: String,
      enum: ['store', 'update'],
      required: true,
    },
    register_start: {
      type: String,
      required: true,
    },
    register_end: {
      type: String,
      required: true,
    },

    student: {
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

export default mongoose.model('Notification', NotificationSchema);
