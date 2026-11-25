import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        addTask:(state,action)=>{
            state.push(action.payload)
        },
        deletTask:(state,action)=>{
            return state.filter((item) => item.id !== action.payload);
        },
        deletAll:()=>{
            return []
        },
        checkTask:(state,action)=>{
            const item = state.find((item)=>item.id=== action.payload);
            if(item){
                item.check = !item.check
            }
        },
        editTask:(state,action)=>{
            const item =state.find((item)=>item.id===action.payload.id);
            if(item){
                item.text=action.payload.text
            }
        }
    }
})

export const {addTask, deletTask,deletAll,checkTask,editTask} = taskSlice.actions
export default taskSlice.reducer