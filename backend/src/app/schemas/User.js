import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 8)
  this.password = hash
  next()
})

export default mongoose.model('User', UserSchema);

/*
name: 'Administrador',
email: 'admin@gympoint.com',
password_hash: bcrypt.hashSync('123456', 8),
*/