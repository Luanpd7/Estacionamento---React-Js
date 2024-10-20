import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { nome, placa, precoAteUmaHora, precoAposUmaHora } = await request.json();

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        placa,
        estacionamento: {
          create: {
            precoAteUmaHora: parseFloat(precoAteUmaHora),
            precoAposUmaHora: parseFloat(precoAposUmaHora),
          },
        },
      },
    });
    return new Response(JSON.stringify(cliente), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar cliente e estacionamento' }), { status: 500 });
  }
}
