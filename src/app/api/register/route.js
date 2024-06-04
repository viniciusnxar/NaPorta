import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Handler para o método POST
export async function POST(req) {
  // Extrai o corpo da requisição
  const body = await req.json();
  
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);

  // Verifica se a senha atende aos critérios de comprimento mínimo
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    throw new Error('A senha deve ter mais que 5 caracteres');
  }

  // Armazena a senha não criptografada
  const notHashedPassword = pass;
  
  // Gera um salt para a criptografia da senha
  const salt = bcrypt.genSaltSync(10);
  
  // Criptografa a senha e substitui no corpo da requisição
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  // Cria um novo usuário no banco de dados com os dados fornecidos
  const createdUser = await User.create(body);
  
  // Retorna o usuário criado como resposta JSON
  return Response.json(createdUser);
}
