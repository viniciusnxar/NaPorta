import { ChecarAdmin } from '@/app/api/auth/[...nextauth]/route';
import { MenuItem } from '@/models/MenuItem';
import mongoose from 'mongoose';

// Handler para o método POST
export async function POST(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Extrai os dados do corpo da requisição
  const data = await req.json();
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Cria um novo documento de item de menu no banco de dados
    const menuItemDoc = await MenuItem.create(data);
    
    // Retorna o novo item de menu como resposta JSON
    return Response.json(menuItemDoc);
  } else {
    // Retorna um objeto vazio se o usuário não for administrador
    return Response.json({});
  }
}

// Handler para o método PUT
export async function PUT(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Extrai o ID e os dados do corpo da requisição
    const { _id, ...data } = await req.json();
    
    // Atualiza o documento do item de menu no banco de dados
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  
  // Retorna true como resposta JSON
  return Response.json(true);
}

// Handler para o método GET
export async function GET() {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Busca todos os itens de menu no banco de dados e retorna como resposta JSON
  return Response.json(await MenuItem.find());
}

// Handler para o método DELETE
export async function DELETE(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Obtém o ID do item de menu a ser deletado dos parâmetros da URL
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Deleta o item de menu no banco de dados
    await MenuItem.deleteOne({ _id });
  }
  
  // Retorna true como resposta JSON
  return Response.json(true);
}
