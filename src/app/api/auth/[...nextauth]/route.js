import clientPromise from '@/libs/mongoConnect';
import bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';
import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"

// Configurações de autenticação para NextAuth
export const authOptions = {
  secret: process.env.SECRET, // Chave secreta para assinar tokens
  adapter: MongoDBAdapter(clientPromise), // Adaptador para usar MongoDB com NextAuth
  providers: [
    // Provedor de autenticação Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // ID do cliente Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Segredo do cliente Google
    }),
    // Provedor de autenticação por credenciais
    CredentialsProvider({
      name: 'Credentials', // Nome do provedor
      id: 'credentials', // ID do provedor
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" }, // Campo de email
        password: { label: "Password", type: "password" }, // Campo de senha
      },
      // Função de autorização para verificar as credenciais fornecidas
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        // Conectar ao banco de dados MongoDB
        mongoose.connect(process.env.MONGODB_URI);

        // Procurar usuário no banco de dados pelo email
        const user = await User.findOne({ email });

        // Verificar se a senha está correta
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        // Se a senha estiver correta, retorna o usuário
        if (passwordOk) {
          return user;
        }

        // Senão, retorna null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Estratégia de sessão usando JWT
    maxAge: 30 * 24 * 60 * 60 // Sessão expira em 30 dias
  }
};

// Função para verificar se o usuário é administrador
export async function ChecarAdmin() {
  const session = await getServerSession(authOptions); // Obtém a sessão do servidor
  const userEmail = session?.user?.email; // Extrai o email do usuário da sessão

  // Se não houver email, retorna falso
  if (!userEmail) {
    return false;
  }

  // Procura informações do usuário pelo email
  const userInfo = await UserInfo.findOne({ email: userEmail });

  // Se não encontrar informações, retorna falso
  if (!userInfo) {
    return false;
  }

  // Retorna o status de administrador do usuário
  return userInfo.admin;
}

// Configura o manipulador de autenticação usando NextAuth
const handler = NextAuth(authOptions);

// Exporta o manipulador para métodos GET e POST
export { handler as GET, handler as POST };
