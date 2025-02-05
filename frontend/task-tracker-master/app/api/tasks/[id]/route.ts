import { taskSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // Fixed parameter destructuring
) {
  const body = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  const updatedTask = await prisma.task.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      status: body.status,
      description: body.description,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    const task = await prisma.task.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!task)
        notFound();

    await prisma.task.delete({
        where: {id: task.id}
    });

    return NextResponse.json({});
}