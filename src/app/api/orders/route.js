import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

// Handler para o método GET
export async function GET(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGO_URL);

  // Obtém a sessão do servidor e extrai o email do usuário
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  
  // Extrai o ID do pedido dos parâmetros da URL, se disponível
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  
  // Se um ID de pedido foi fornecido, busca o pedido específico no banco de dados
  if (_id) {
    return Response.json(await Order.findById(_id));
  }
  
  // Se nenhum ID de pedido foi fornecido, busca todos os pedidos no banco de dados
  return Response.json(await Order.find());

  // Verifica se o email do usuário está disponível
  if (userEmail) {
    // Busca todos os pedidos associados ao email do usuário e retorna como resposta JSON
    return Response.json(await Order.find({ userEmail }));
  }
}
