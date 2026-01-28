import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client','owner'], default: 'client' }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = bcrypt.hash(this.password, 10);
});


userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

export default mongoose.model('User', userSchema);
