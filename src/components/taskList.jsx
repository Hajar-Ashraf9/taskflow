import { useSelector,useDispatch } from "react-redux"
import { checkTask, deletTask,editTask } from "../redux/taskSlice";
import { store } from "../redux/store";
import { useState } from "react";

const priorityStyle = {
    high: "bg-rose-100 text-rose-600 dark:bg-rose-500/25 dark:text-rose-200",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-400/25 dark:text-amber-200",
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/25 dark:text-emerald-200",
};

const TaskList = () => {
    const task = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const[filter,setfilter]=useState("all");
    const[editingId,setEditingId]=useState(null);
    const[editText,setEditText]=useState("");
    const[removingId,setRemovingId]=useState(null);
    const today = new Date().toLocaleDateString("en-CA");
    const filteredTasks= task.filter((item)=>{
        if(filter==="done"){
            return item.check};
        if (filter==="notdone") {
            return !item.check};
            return true
        })
    const save = () => localStorage.setItem("item",JSON.stringify(store.getState().tasks))

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.text);
    }
    const saveEdit = (id) => {
        const newText = editText.trim();
        if(newText){
            dispatch(editTask({id,text:newText}));
            save();
        }
        setEditingId(null);
    }
    const handleDelete = (id) => {
        setRemovingId(id);
        setTimeout(()=>{
            dispatch(deletTask(id));
            save();
            setRemovingId(null);
        },200);
    }

    const formatDate = (d) =>
        new Date(d + "T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})

    const filterBtn = (name) =>
        "rounded-xl px-4 py-1.5 text-sm font-medium transition " +
        (filter===name
            ? "bg-violet-600 text-white dark:bg-violet-300 dark:text-violet-950"
            : "bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-white/10 dark:text-violet-100 dark:hover:bg-white/20")
    return (
    <div className="mx-auto mt-6 w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-violet-100 transition-colors dark:bg-[#4D3A87] dark:shadow-black/30 dark:ring-violet-300/20">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-violet-950 dark:text-white">Tasks List</h2>
        <div className="mb-4 flex flex-wrap gap-2">
        <button className={filterBtn("all")} onClick={()=>setfilter("all")}>All</button>
        <button className={filterBtn("done")} onClick={()=>setfilter("done")}>Done</button>
        <button className={filterBtn("notdone")} onClick={()=>setfilter("notdone")}>Not Done</button>
        </div>
        {filteredTasks.map((item)=>
        <p key={item.id} className={"mb-2 flex items-center gap-2 rounded-2xl bg-violet-50 px-4 py-3 text-lg text-violet-950 transition duration-200 hover:bg-violet-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 " + (removingId===item.id ? "pointer-events-none -translate-x-6 opacity-0" : "animate-task-in")}>
        {editingId===item.id ? (
            <>
            <input type="text" autoFocus
            className="min-w-0 flex-1 rounded-xl border border-violet-300 bg-white px-3 py-1.5 text-lg text-violet-950 focus:outline-none focus:ring-4 focus:ring-violet-300/50 dark:border-violet-300/30 dark:bg-white/10 dark:text-white"
            value={editText}
            onChange={(e)=>setEditText(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key==="Enter") saveEdit(item.id);
                if(e.key==="Escape") setEditingId(null);
            }}/>
            <button className="rounded-xl bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-violet-700 dark:bg-violet-300 dark:text-violet-950 dark:hover:bg-violet-200" onClick={()=>saveEdit(item.id)}>Save</button>
            <button className="rounded-xl bg-violet-100 px-3 py-1.5 text-sm font-medium text-violet-700 transition hover:bg-violet-200 dark:bg-white/15 dark:text-violet-100 dark:hover:bg-white/25" onClick={()=>setEditingId(null)}>Cancel</button>
            </>
        ) : (
            <>
            <span className="min-w-0 flex-1">
                <span className={"block break-words " + (item.check ? "text-violet-300 line-through dark:text-violet-200/50" : "")}>{item.text}</span>
                {(item.priority || item.dueDate) && (
                <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    {item.priority && (
                    <span className={"rounded-full px-2 py-0.5 text-xs font-medium capitalize " + (priorityStyle[item.priority] || priorityStyle.medium)}>{item.priority}</span>
                    )}
                    {item.dueDate && (
                    <span className={"rounded-full px-2 py-0.5 text-xs font-medium " + (!item.check && item.dueDate < today ? "bg-rose-100 text-rose-600 dark:bg-rose-500/25 dark:text-rose-200" : "bg-violet-100 text-violet-700 dark:bg-white/15 dark:text-violet-100")}>
                        {!item.check && item.dueDate < today ? "Overdue · " : "Due "}{formatDate(item.dueDate)}
                    </span>
                    )}
                </span>
                )}
            </span>
            <button className="rounded-xl bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-500/20 dark:text-rose-200 dark:hover:bg-rose-500 dark:hover:text-white" onClick={()=>handleDelete(item.id)}>Delet Your Task</button>
            <button className="rounded-xl bg-violet-100 px-3 py-1.5 text-sm font-medium text-violet-700 transition hover:bg-violet-600 hover:text-white dark:bg-white/15 dark:text-violet-100 dark:hover:bg-violet-300 dark:hover:text-violet-950" onClick={()=>startEdit(item)}>Edit</button>
            </>
        )}
        <input type="checkbox" name="Done" id="check"
        className="h-5 w-5 shrink-0 cursor-pointer accent-violet-600 dark:accent-violet-300"
        checked={!!item.check}
        onChange={()=>{dispatch(checkTask(item.id));
            save()
        }}/>
        </p>
        )}
        
    
    </div>
    )
}

export default TaskList