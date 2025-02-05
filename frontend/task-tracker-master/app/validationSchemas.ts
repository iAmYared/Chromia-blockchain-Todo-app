import z from 'zod';


export const taskSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255),
    description: z.string().min(1),
    status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], {
        errorMap: () => ({message: 'Status must be "NOT_STARTED", "IN_PROGRESS", or "COMPLETED" '}),
    }),
});

