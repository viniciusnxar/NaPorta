import { ChecarAdmin } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/models/User';
import mongoose from 'mongoose';

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI);
  if (await ChecarAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
