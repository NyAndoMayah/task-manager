import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTaskManager } from '@/store/useTaskManager';
import { ChangeEvent, RefObject, useRef, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const createTaskRef: RefObject<HTMLInputElement> = useRef(null);
  const [localTasks, setLocalTasks] = useState([]);
  const { tasks, searchTask, addTask, updateTask, deleteTask, setSearchTask } =
    useTaskManager();
  const { addItem, getItem } = useLocalStorage();
  if (typeof window !== 'undefined') {
    addItem('tasks', JSON.stringify(tasks));
    setLocalTasks(JSON.parse(getItem('tasks') || ''));
  }
  const handleAddTask = () => {
    let title = createTaskRef?.current?.value!;
    // Replace with the value in the createTaskRef
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask?.toLowerCase()!)
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {
                  id: task.id,
                  title: e.target.value,
                  completed: task.completed,
                })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
