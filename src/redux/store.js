import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice'

const savedTasks=localStorage.getItem("item")
const initTask= savedTasks? JSON.parse(savedTasks):[];
export const store = configureStore ({
    reducer:{
        tasks:taskSlice
    },
    preloadedState:{
        tasks:initTask,
    },
})
