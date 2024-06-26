import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducers.js'
import { messengerReducer } from './reducers/messengerReducer.js'
import { currentFriendReducer } from './reducers/currentFriendReducer.js'


export const store = configureStore({
  reducer: {
    auth:authReducer,
    messenger:messengerReducer,
    currentFriend:currentFriendReducer
  },
})