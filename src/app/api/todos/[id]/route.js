import { prisma } from '@/src/lib/prisma';
import { logger } from '@/src/lib/logger';
import { NextResponse } from 'next/server';
import {
  PRIORITY_LABELS,
  MAX_TODO_TITLE_LENGTH
} from '@/src/lib/constants';

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const title = body.title?.trim();
  const completed = body.completed;
  const priority = body.priority;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  if (title && title.length > MAX_TODO_TITLE_LENGTH) {
    return NextResponse.json(
      { error: `Title should not contain more than ${MAX_TODO_TITLE_LENGTH} characters` },
      { status: 400 }
    );
  }

  if (priority !== undefined && !Object.hasOwn(PRIORITY_LABELS, priority)) {
    return NextResponse.json(
      { error: `Invalid priority value. The allowed values are: ${Object.keys(PRIORITY_LABELS)}` },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
        ...(priority !== undefined && { priority }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    logger.error('Failed to update todo:', error);
    return NextResponse.json({ error: `Failed to update todo: ${error}` }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    await prisma.todo.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error('Failed to delete todo:', error);
    return NextResponse.json({ error: `Failed to delete todo: ${error}` }, { status: 500 });
  }
}
