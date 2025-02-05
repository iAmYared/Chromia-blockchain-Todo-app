import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, {label: string, color: 'red' | 'violet' | 'green'}> = {
    NOT_STARTED: {label: 'Not Started', color : 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    COMPLETED: {label: 'Completed', color: 'green'}
}

const TaskStatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].label}
    </Badge>
  )
}

export default TaskStatusBadge