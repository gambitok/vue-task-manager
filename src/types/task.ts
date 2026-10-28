export interface Task {
  id: number
  title: string
  completed: boolean
}

export type UpdateTaskData = Partial<Pick<Task, 'title' | 'completed'>>
