import { ChecarAdmin } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/models/User';
import mongoose from 'mongoose';

// Handler para o método GET
export async function GET() {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);

  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Se for administrador, busca todos os usuários no banco de dados
    const users = await User.find();
    
    // Retorna a lista de usuários como resposta JSON
    return Response.json(users);
  } else {
    // Se não for administrador, retorna uma lista vazia
    return Response.json([]);
  }
}
