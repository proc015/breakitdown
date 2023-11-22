import { configureStore } from '@reduxjs/toolkit'
import stepReducer from './reducers/stepSlice'

export default configureStore({
    reducer: {
        step: stepReducer
    }
})

