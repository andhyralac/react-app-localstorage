import { useState } from 'react'

export const TaskCreator = ({ createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createNewTask(newTaskName)
    setNewTaskName('')
  }

  return (
    <form onSubmit={handleSubmit} className="my-2 row">
      <div className="col-8">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-4">
        <button className="btn btn-primary btn-sm">Save Task</button>
      </div>
    </form>
  )
}
