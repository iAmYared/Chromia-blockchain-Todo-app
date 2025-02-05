import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import TaskClient from '../../_components/TaskClient';



const EditTaskPage = async ({ params }: {params: {id: string}}) => {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!task) notFound();
    return (
        <TaskClient task={task} />
    )
}

export default EditTaskPage