import { ChecarAdmin } from '@/app/api/auth/[...nextauth]/route';
import { Category } from '@/models/Category';
import mongoose from 'mongoose';

// Handler para o método POST
export async function POST(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Obtém o nome da categoria do corpo da requisição
  const { name } = await req.json();
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Cria um novo documento de categoria no banco de dados
    const categoryDoc = await Category.create({ name });
    
    // Retorna a nova categoria como resposta JSON
    return Response.json(categoryDoc);
  } else {
    // Retorna um objeto vazio se o usuário não for administrador
    return Response.json({});
  }
}

// Handler para o método PUT
export async function PUT(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Obtém o ID e o nome da categoria do corpo da requisição
  const { _id, name } = await req.json();
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Atualiza o nome da categoria no banco de dados
    await Category.updateOne({ _id }, { name });
  }
  
  // Retorna true como resposta JSON
  return Response.json(true);
}

// Handler para o método GET
export async function GET() {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Busca todas as categorias no banco de dados e retorna como resposta JSON
  return Response.json(await Category.find());
}

// Handler para o método DELETE
export async function DELETE(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);
  
  // Obtém o ID da categoria a ser deletada dos parâmetros da URL
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  
  // Verifica se o usuário é administrador
  if (await ChecarAdmin()) {
    // Deleta a categoria no banco de dados
    await Category.deleteOne({ _id });
  }
  
  // Retorna true como resposta JSON
  return Response.json(true);
}
