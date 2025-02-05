'use client'
import { ErrorMessage, Spinner } from '@/app/components';
import { taskSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';


type taskFormData = z.infer<typeof taskSchema>

const TaskForm = ({ task }: { task?: Task }) => {

    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<taskFormData>({
        resolver: zodResolver(taskSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (task) {
                await axios.patch(`/api/tasks/${task.id}`, data);
            }
            else {
                await axios.post('/api/tasks', data);
            }
            router.push('/tasks');
            router.refresh();
        } catch (error) {
            setSubmitting(false);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
              setError('Validation error: ' + error.response.data.error);
            } else {
              setError('An unexpected error occurred.');
            }
          }
    });

    return (
        <div className="max-w-xl">
            {error &&
                <Callout.Root color="red">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form
                className=" mt-5 space-y-3"
                onSubmit={onSubmit}>
                <TextField.Root defaultValue={task?.title} placeholder="Title" {...register('title')}>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <TextField.Root defaultValue={'NOT_STARTED'} placeholder="Status" {...register('status')}>
                </TextField.Root>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>


                <Controller
                    name="description"
                    control={control}
                    defaultValue={task?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />
                    }

                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>
                    {task ? 'Update task' : 'Submit New task'} {isSubmitting && <Spinner />}
                </Button>
                { }
            </form>
        </div>
    )
}

export default TaskForm


