import { useState, useEffect } from "react";
import { addTask, deletAll } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";

const fieldClass =
    "w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-violet-950 focus:outline-none focus:ring-4 focus:ring-violet-300/50 dark:border-violet-300/20 dark:bg-white/10 dark:text-white dark:[color-scheme:dark]";

const TaskForm = () => {
    const [text,setText]=useState("");
    const [priority,setPriority]=useState("medium");
    const [dueDate,setDueDate]=useState("");
    const [confirmOpen,setConfirmOpen]=useState(false);
    const dispatch =useDispatch();

    useEffect(()=>{
        if(!confirmOpen) return;
        const onKey=(e)=>{ if(e.key==="Escape") setConfirmOpen(false) };
        window.addEventListener("keydown",onKey);
        return ()=>window.removeEventListener("keydown",onKey);
    },[confirmOpen]);

    const handelSubmit=(e)=>{
        e.preventDefault();
        const taskText=text.trim();
        if(!taskText)
            return
            dispatch(addTask({
                id: crypto.randomUUID(),
                text: taskText,
                check:false,
                priority,
                dueDate
            }));
            localStorage.setItem("item",JSON.stringify(store.getState().tasks));
            setText("");
            setPriority("medium");
            setDueDate("");
    }
    return (
    <div className="mx-auto mt-16 w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-violet-100 transition-colors dark:bg-[#4D3A87] dark:shadow-black/30 dark:ring-violet-300/20">
        <form onSubmit={handelSubmit} className="grid gap-2">
            <div className="flex gap-2">
                <input type="text" 
                className="min-w-0 flex-1 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-lg text-violet-950 placeholder:text-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-300/50 dark:border-violet-300/20 dark:bg-white/10 dark:text-white dark:placeholder:text-violet-200/60"
                placeholder="Write Your Task"
                required
                value={text}
                onChange={(e)=>setText(e.target.value)}
                />
                <button className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-700 active:scale-95 dark:bg-violet-300 dark:text-violet-950 dark:hover:bg-violet-200" onClick={()=>dispatch(addTask)}>Add Your Task</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <select className={fieldClass} value={priority} onChange={(e)=>setPriority(e.target.value)} aria-label="Priority">
                    <option className="bg-white text-violet-950 dark:bg-[#4D3A87] dark:text-white" value="low">Low priority</option>
<option className="bg-white text-violet-950 dark:bg-[#4D3A87] dark:text-white" value="medium">Medium priority</option>
<option className="bg-white text-violet-950 dark:bg-[#4D3A87] dark:text-white" value="high">High priority</option>
                </select>
                <input type="date" className={fieldClass} value={dueDate} onChange={(e)=>setDueDate(e.target.value)} aria-label="Due date"/>
            </div>
        </form>
        <button className="mt-3 rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-500/20 dark:text-rose-200 dark:hover:bg-rose-500 dark:hover:text-white" onClick={()=>setConfirmOpen(true)}>Delet All</button>

        {confirmOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-violet-950/50 px-4 backdrop-blur-sm" onClick={()=>setConfirmOpen(false)}>
            <div className="w-full max-w-sm animate-task-in rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-violet-100 dark:bg-[#4D3A87] dark:ring-violet-300/20" onClick={(e)=>e.stopPropagation()}>
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-2xl dark:bg-rose-500/20">🗑️</div>
                <h3 className="text-xl font-bold text-violet-950 dark:text-white">Delete all tasks?</h3>
                <p className="mt-1 text-violet-600 dark:text-violet-200">This will remove every task in your list. You can't undo it.</p>
                <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-xl bg-violet-100 px-4 py-2.5 font-medium text-violet-700 transition hover:bg-violet-200 dark:bg-white/15 dark:text-violet-100 dark:hover:bg-white/25" onClick={()=>setConfirmOpen(false)}>Cancel</button>
                    <button className="flex-1 rounded-xl bg-rose-500 px-4 py-2.5 font-medium text-white transition hover:bg-rose-600" onClick={()=>{dispatch(deletAll());
                    localStorage.setItem("item",JSON.stringify(store.getState().tasks));
                    setConfirmOpen(false);
                    }}>Yes, delete all</button>
                </div>
            </div>
        </div>
        )}
    </div>
    )
}

export default TaskForm