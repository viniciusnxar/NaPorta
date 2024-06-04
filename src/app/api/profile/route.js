import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

// Handler para o método PUT
export async function PUT(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);

  // Extrai os dados do corpo da requisição
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  
  // Se um ID é fornecido, usa-o como filtro
  if (_id) {
    filter = { _id };
  } else {
    // Se nenhum ID é fornecido, obtém a sessão do servidor e usa o email do usuário como filtro
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  // Encontra o usuário no banco de dados com base no filtro
  const user = await User.findOne(filter);

  // Atualiza o nome e a imagem do usuário
  await User.updateOne(filter, { name, image });

  // Atualiza outras informações do usuário em UserInfo, usando upsert para criar o documento se ele não existir
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

  // Retorna true como resposta JSON
  return Response.json(true);
}

// Handler para o método GET
export async function GET(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);

  // Extrai o ID dos parâmetros da URL, se disponível
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};

  // Se um ID é fornecido, usa-o como filtro
  if (_id) {
    filterUser = { _id };
  } else {
    // Se nenhum ID é fornecido, obtém a sessão do servidor e usa o email do usuário como filtro
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    
    // Se não houver email na sessão, retorna um objeto vazio
    if (!email) {
      return Response.json({});
    }
    
    filterUser = { email };
  }

  // Encontra o usuário no banco de dados com base no filtro
  const user = await User.findOne(filterUser).lean();
  
  // Encontra informações adicionais do usuário em UserInfo
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  // Retorna a combinação das informações do usuário e as informações adicionais como resposta JSON
  return Response.json({ ...user, ...userInfo });
}
