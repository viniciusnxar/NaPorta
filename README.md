# NaPorta - Aplicativo de Delivery de Comida

**NaPorta** é um aplicativo de delivery de comida online desenvolvido como parte do projeto aplicado em Front-end. Ele oferece uma plataforma simples e eficiente para conectar restaurantes e clientes, permitindo a visualização de cardápios, o gerenciamento de pedidos e o acompanhamento de entregas em tempo real.

## Tecnologias Utilizadas

- **Next.js**: Framework React para a construção da interface e páginas dinâmicas.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações de usuários, pedidos e restaurantes.
- **AWS (S3 Bucket)**: Utilizado para o armazenamento de arquivos, como imagens de produtos e perfis de restaurantes.
- **Stripe**: Integração de pagamentos segura e simplificada.

## Funcionalidades

- **Autenticação de Usuário**: Login e cadastro de usuários utilizando autenticação segura.
- **Carrinho de Compras**: Funcionalidade que permite adicionar, remover e visualizar itens no carrinho de compras.
- **Lista de Desejos**: Adicionar produtos à lista de desejos para fácil acesso posterior.
- **Sistema de Avaliações**: Clientes podem avaliar restaurantes e produtos.
- **Gestão de Pedidos**: Criação, atualização e acompanhamento de pedidos em tempo real.
- **Processamento de Pagamentos**: Integração com a API do Stripe para processar pagamentos.

## Instalação

Siga os passos abaixo para executar o projeto localmente:

1. Clone o repositório:

   
> git clone [[https://github.com/viniciusnxar/naporta](https://github.com/viniciusnxar/NaPorta](https://github.com/viniciusnxar/NaPorta))

2. Instale as dependências:
`
cd na-porta
npm install
`
3. Crie um arquivo .env na raiz do projeto e configure suas variáveis de ambiente:

**Exemplo de variáveis de ambiente**
`
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/na-porta
NEXT_PUBLIC_AWS_BUCKET=<aws-bucket-url>
STRIPE_SECRET_KEY=<stripe-secret-key>
`
4. Execute o servidor de desenvolvimento:
npm run dev

5. Abra o navegador e acesse http://localhost:3000.



## Estrutura do Projeto

    /pages: Contém as páginas do aplicativo.
    /components: Componentes reutilizáveis da interface do usuário.
    /lib: Funções auxiliares para integração com APIs externas (AWS, MongoDB, Stripe).
    /styles: Arquivos CSS e Tailwind para estilização.

## Contribuição

Contribuições são bem-vindas! Se você quiser sugerir melhorias ou encontrar bugs, sinta-se à vontade para abrir um issue ou enviar um pull request.
