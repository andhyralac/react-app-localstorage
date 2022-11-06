import { useEffect, useState } from 'react'
import './App.css'
import { Container } from './components/Container'
import { TaskCreator } from './components/TaskCreator'
import { TaskTable } from './components/TaskTable'
import { VisibilityControl } from './components/VisibilityContro'
import { getTasks } from './services/getTasks'
import { addTask } from './services/addTask'

function App() {
  const [taskItems, setTasksItems] = useState([])
  const [showComplete, setShowComplete] = useState(false)

  const createNewTask = (taskName) => {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTasksItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    )
  }

  useEffect(() => {
    const data = getTasks()
    if (data) {
      setTasksItems(JSON.parse(data))
    }
  }, [])

  const cleanTask = () => {
    setTasksItems(taskItems.filter((task) => !task.done))
    setShowComplete(false)
  }

  useEffect(() => {
    addTask(taskItems)
  }, [taskItems])

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showComplete}
          setShowComplete={(checked) => setShowComplete(checked)}
          cleanTasks={cleanTask}
        />

        {showComplete === true && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showComplete={showComplete}
          />
        )}
      </Container>
    </main>
  )
}

export default App
