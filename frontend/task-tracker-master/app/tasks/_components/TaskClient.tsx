'use client';
import dynamic from 'next/dynamic';
import TaskFormSkeleton from './TaskFormSkeleton';
import { Task } from '@prisma/client';

const TaskForm = dynamic(
    () => import('@/app/tasks/_components/TaskForm'),
    {
        ssr: false,
        loading: () => <TaskFormSkeleton />
    }
)

const TaskClient = ({task}: {task ?: Task}) => {
    return <TaskForm task={task}/>
}

export default TaskClient;