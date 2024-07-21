import {configureStore} from '@reduxjs/toolkit'
import {default as universalReducer} from '../state/universalSlice'
const store = configureStore({
     reducer: {
        universal: universalReducer
     },
})

export default store