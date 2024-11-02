import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const entries = await prisma.cliente.findMany({
      include: {
        estacionamento: true, // Inclui dados de estacionamento relacionados ao cliente
      },
    });
    return new Response(JSON.stringify(entries), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar dados' }), { status: 500 });
  }
}

export async function POST(request) {
  const { nome, placa, precoAteUmaHora, precoAposUmaHora } = await request.json();
  try {
    const newEntry = await prisma.cliente.create({
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
    return new Response(JSON.stringify(newEntry), { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return new Response(JSON.stringify({ error: 'Erro ao salvar os dados' }), { status: 500 });
  }
}



export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Captura o id da URL

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID não fornecido' }), { status: 400 });
  }

  try {
    // Exclui os registros relacionados de estacionamento primeiro
    await prisma.estacionamento.deleteMany({
      where: {
        clienteId: parseInt(id),
      },
    });

    // Exclui o cliente depois
    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Entrada excluída com sucesso' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir entrada:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir entrada' }), { status: 500 });
  }
}
