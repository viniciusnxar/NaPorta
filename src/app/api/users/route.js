import { isAdmin } from '@/libs/isAdmin';
import { User } from '@/models/User';
import mongoose from 'mongoose';

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
