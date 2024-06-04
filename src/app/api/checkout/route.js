import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MenuItem } from '@/models/MenuItem';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
const stripe = require('stripe')(process.env.STRIPE_SK);

// Handler para o método POST
export async function POST(req) {
  // Conecta ao MongoDB
  mongoose.connect(process.env.MONGODB_URI);

  // Extrai produtos do carrinho e endereço do corpo da requisição
  const { cartProducts, address } = await req.json();

  // Obtém a sessão do servidor e extrai o email do usuário
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  // Cria um novo documento de pedido no banco de dados
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false, // O pagamento ainda não foi efetuado
  });

  // Prepara os itens de linha para a sessão do Stripe
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    // Busca informações do produto no banco de dados
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;

    // Adiciona o preço do tamanho, se aplicável
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }

    // Adiciona o preço dos extras, se aplicável
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(
          (extra) =>
            extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    // Adiciona o item de linha ao array do Stripe
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'BRL',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, // O preço no Stripe é em centavos
      },
    });
  }

  // Cria uma sessão de checkout no Stripe
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      'orders/' +
      orderDoc._id.toString() +
      '?clear-cart=1', // URL de sucesso após o pagamento
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1', // URL de cancelamento
    metadata: { orderId: orderDoc._id.toString() }, // Metadata com o ID do pedido
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() }, // Metadata adicional
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee', // Nome da taxa de entrega
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'BRL' }, // Valor fixo da taxa de entrega
        },
      },
    ],
  });

  // Retorna a URL da sessão do Stripe como resposta
  return Response.json(stripeSession.url);
}
