import { NextResponse } from 'next/server';

/**
 * Webhook Skeleton - Automação WhatsApp (API Oficial ou Z-API / Evolution)
 * Exemplo de rota preparada para disparar mensagens automáticas de recuperação de carrinho,
 * status do pedido ou agradecimento.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, type, data } = body;

    if (!phone || !type) {
      return NextResponse.json({ error: 'Telefone e Tipo da Mensagem são obrigatórios' }, { status: 400 });
    }

    let messageContent = '';

    // Lógica de Mensagens baseada no tipo de evento
    switch (type) {
      case 'abandoned_cart':
        messageContent = `Olá ${data.name}, vimos que você quase finalizou seu pedido na MRSOLE Outfit!\nFicou alguma dúvida sobre o frete ou tamanho da peça?`;
        break;
      case 'payment_received':
        messageContent = `Oba! O pagamento do seu pedido ${data.orderCode} foi confirmado. Seu estilo agradece! 😎`;
        break;
      case 'order_shipped':
        messageContent = `Seu pedido está a caminho! 🚚 Acompanhe pelo código de rastreio: ${data.trackingCode}`;
        break;
      default:
        messageContent = `Olá! Recebemos sua notificação via sistema.`;
    }

    // TODO: Integração real com API de WhatsApp
    // const apiUrl = process.env.WHATSAPP_API_URL; // Ex: Z-API instance
    // const apiToken = process.env.WHATSAPP_API_TOKEN;
    // 
    // const response = await fetch(`${apiUrl}/send-text`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiToken}`
    //   },
    //   body: JSON.stringify({
    //     phone,
    //     message: messageContent
    //   })
    // });

    // Mock response for MVP
    console.log('[Webhook WhatsApp] Simulando disparo para', phone, ':', messageContent);

    return NextResponse.json({ success: true, message: 'Disparo agendado' }, { status: 200 });
  } catch (error) {
    console.error('[Webhook WhatsApp] Erro interno:', error);
    return NextResponse.json({ error: 'Erro ao processar integração' }, { status: 500 });
  }
}
