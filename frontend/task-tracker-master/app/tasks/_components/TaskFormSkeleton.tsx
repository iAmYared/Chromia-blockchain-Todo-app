import { Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components'

const TaskFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
        <Skeleton height="2rem"/>
        <Skeleton height="2rem" />
        <Skeleton height="16rem" />
        <Skeleton className="mt-5" width="5.5rem" height="1.75rem" />
        
    </Box>
  )
}

export default TaskFormSkeleton