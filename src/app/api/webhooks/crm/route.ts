import { NextResponse } from 'next/server';

/**
 * Webhook Skeleton - Integração CRM
 * Exemplo de rota preparada para disparar dados de Leads capturados 
 * para um CRM (RD Station, ActiveCampaign, HubSpot, etc).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, source, campaign } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Faltam dados obrigatórios' }, { status: 400 });
    }

    // TODO: Integração real com o CRM escolhido
    // const crmApiKey = process.env.CRM_API_KEY;
    // const response = await fetch('https://api.rd.services/platform/conversions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${crmApiKey}`
    //   },
    //   body: JSON.stringify({
    //     event_type: "CONVERSION",
    //     event_family: "CDP",
    //     payload: {
    //       conversion_identifier: "Novo Lead - Site MRSOLE",
    //       name,
    //       email: email || '',
    //       mobile_phone: phone,
    //       custom_fields: { origem: source, utm_campaign: campaign }
    //     }
    //   })
    // });

    // Mock response for MVP
    console.log('[Webhook CRM] Simulando envio para CRM:', { name, phone, source, campaign });

    return NextResponse.json({ success: true, message: 'Lead processado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('[Webhook CRM] Erro interno:', error);
    return NextResponse.json({ error: 'Erro ao processar integração' }, { status: 500 });
  }
}
