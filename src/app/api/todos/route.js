import { prisma } from '@/src/lib/prisma';
import { logger } from '@/src/lib/logger';
import { NextResponse } from 'next/server';
import {
  PRIORITY_LABELS,
  MAX_TODO_TITLE_LENGTH,
  DEFAULT_PRIORITY_VALUE
} from '@/src/lib/constants';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    logger.info({ todos }, 'Fetched todos');
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    logger.error({ error }, 'Failed to get todos');
    return NextResponse.json({ error: `Failed to get todos: ${error}` }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const title = body.title?.trim();
  const priority = body.priority;

  if (!title) {
    return NextResponse.json({ error: 'Title is required field' }, { status: 400 });
  }

  if (title.length > MAX_TODO_TITLE_LENGTH) {
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
    const newTodo = await prisma.todo.create({
      data: {
        title,
        priority: priority || DEFAULT_PRIORITY_VALUE,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    logger.error('Failed to add todo:', error);
    return NextResponse.json({ error: `Failed to add todo: ${error}` }, { status: 500 });
  }
}
