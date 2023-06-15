import create from 'zustand';
type Task = {
  id: number;
  title: string;
  completed: boolean;
};
type State = [tasks: Array<Task>, searchTask: string | null];
type Action = {
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (taskTitle: string) => void;
};

interface TaskState {
  tasks: Array<Task>;
  searchTask: string | null;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (taskTitle: string) => void;
}
const useTaskManager = create<TaskState>()((set) => ({
  tasks: [
    {
      id: 0,
      title: '',
      completed: false,
    },
  ],
  searchTask: '',
  addTask: (newTask: Task) =>
    set((state) => ({ tasks: [...state.tasks, newTask] })),
  updateTask: (taskId: number, updatedTask: Task) =>
    set((state) => ({
      tasks: [
        ...state.tasks.filter((element) => element.id != taskId),
        updatedTask,
      ],
    })),
  deleteTask: (taskId: number) =>
    set((state) => ({
      tasks: [...state.tasks.filter((element) => element.id != taskId)],
    })),
  setSearchTask: (taskTitle: string) => set(() => ({ searchTask: taskTitle })),
}));

export { useTaskManager };
