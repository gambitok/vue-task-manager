import type { Task, UpdateTaskData } from '../types/task'

export async function getTasks(): Promise<Task[]> {
  const response = await fetch('http://localhost:3000/tasks')
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json()
}

export async function createTask(title: string): Promise<Task> {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      completed: false,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create tasks')
  }
  return response.json()
}

export async function updateTask(id: number, data: UpdateTaskData): Promise<Task> {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update tasks')
  }
  return response.json()
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}
