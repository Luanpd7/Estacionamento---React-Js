import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Captura o `id` se fornecido

  try {
    if (id) {
      const entry = await prisma.cliente.findUnique({
        where: { id: parseInt(id) },
        include: { estacionamento: true },
      });

      if (!entry) {
        return new Response(JSON.stringify({ error: 'Cliente não encontrado' }), { status: 404 });
      }

      // Calcula o tempo decorrido e o valor acumulado
      const now = new Date();
      const entryTime = new Date(entry.estacionamento.createdAt);
      const timeDiff = Math.abs(now - entryTime) / (1000 * 60 * 60); // Em horas
      const valorAcumulado =
        timeDiff <= 1
          ? entry.estacionamento.precoAteUmaHora
          : entry.estacionamento.precoAteUmaHora +
            (timeDiff - 1) * entry.estacionamento.precoAposUmaHora;

      return new Response(
        JSON.stringify({
          ...entry,
          estacionamento: { ...entry.estacionamento, valorAcumulado },
        }),
        { status: 200 }
      );
    } else {
      const entries = await prisma.cliente.findMany({
        include: { estacionamento: true },
      });

      return new Response(JSON.stringify(entries), { status: 200 });
    }
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

    return new Response(JSON.stringify(newEntry), { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return new Response(JSON.stringify({ error: 'Erro ao salvar os dados' }), { status: 500 });
  }
}

export async function PUT(request) {
  const { id, nome, placa, precoAteUmaHora, precoAposUmaHora } = await request.json();

  try {
    const updatedEntry = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        placa,
        estacionamento: {
          update: {
            data: {
              precoAteUmaHora: parseFloat(precoAteUmaHora),
              precoAposUmaHora: parseFloat(precoAposUmaHora),
            },
            where: { clienteId: parseInt(id) },
          },
        },
      },
    });

    return new Response(JSON.stringify(updatedEntry), { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar entrada:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar entrada' }), { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Captura o `id` da URL

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID não fornecido' }), { status: 400 });
  }

  try {
    await prisma.estacionamento.deleteMany({
      where: {
        clienteId: parseInt(id),
      },
    });

    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Entrada excluída com sucesso' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir entrada:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir entrada' }), { status: 500 });
  }
}
