import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'
import { ToastProvider, useToasts } from 'react-toast-notifications'


export function App() {
  return (
    <ToastProvider>
      <Header />
      <TaskList />
    </ToastProvider>
  )
}