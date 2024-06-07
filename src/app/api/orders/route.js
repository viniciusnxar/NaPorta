import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    // Conecte-se ao MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Obtém a sessão do servidor e extrai o email do usuário
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userEmail = session.user.email;
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    // Se um ID de pedido foi fornecido, busca o pedido específico no banco de dados
    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return new Response("Order not found", { status: 404 });
      }
      return new Response(JSON.stringify(order), { status: 200 });
    }

    // Se nenhum ID de pedido foi fornecido, busca todos os pedidos associados ao email do usuário
    const orders = await Order.find({ userEmail });
    return new Response(JSON.stringify(orders), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
