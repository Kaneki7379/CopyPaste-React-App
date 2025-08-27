import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'
const store = configureStore({
  reducer: {
    paste:pasteReducer
  } // add reducers here later
})

export default store
