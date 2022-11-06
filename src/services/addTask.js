export const addTask = (task) => {
    localStorage.setItem('tasks', JSON.stringify(task))
}