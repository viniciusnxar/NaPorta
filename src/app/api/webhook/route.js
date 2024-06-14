import { Order } from "@/models/Order";

// Inicializa o cliente Stripe com a chave secreta
const stripe = require('stripe')(process.env.STRIPE_SK);

// Handler para o método POST
export async function POST(req) {
  // Obtém a assinatura do cabeçalho da requisição
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    // Lê o corpo da requisição como texto
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;

    // Constrói o evento Stripe a partir da requisição
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    // Loga o erro caso a construção do evento falhe
    console.error('stripe deu ruim');
    console.log(e);

    // Retorna uma resposta de erro 400
    return Response.json(e, { status: 400 });
  }

  // Verifica o tipo de evento
  if (event.type === 'checkout.session.completed') {
    console.log(event);

    // Obtém o ID do pedido e o status de pagamento do evento
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';

    // Se o pagamento foi confirmado, atualiza o status do pedido para pago
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  // Retorna uma resposta de sucesso 200
  return Response.json('DEU FOI CERTO', { status: 200 });
}
