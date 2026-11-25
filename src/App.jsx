import { useState } from "react"
import TaskForm from "./components/taskForm"
import TaskList from "./components/taskList"
const App = () => {
  const[theme,setTheme]=useState(localStorage.getItem("theme") || "light")
  return (
    <div className={theme==="dark" ? "dark" : ""}>
      <div className="min-h-screen bg-violet-50 px-4 py-8 transition-colors dark:bg-[#3B2A68]">
        <button
          className="fixed right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-xl shadow-lg ring-1 ring-violet-100 transition hover:scale-105 dark:bg-[#4D3A87] dark:ring-violet-300/30"
          onClick={()=>setTheme(theme==="light"?"dark":"light")}>
          {theme==="light"?"🌙" : "☀️" }
        </button>
        <TaskForm/>
        <TaskList/>
      </div>
    </div>
  )
}

export default App