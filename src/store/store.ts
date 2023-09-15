import { configureStore } from '@reduxjs/toolkit'
// import abonomentSlice from './slices/abonomentSlice'
import authSlice from './slices/authSlice'
import roleSlice from './slices/roleSlice'
// import tokenSlice from './slices/tokenSlice'
// import gymsfilial from './slices/abonomentsFilial'
// import gymssubscriptype from './slices/abonomentSubscriptTypeslice'
// import gymAbomonentsChoose from './slices/abonomentsChoose'
// import subscriptionAdditional from './slices/abonomentAdditionalType'
export const store = configureStore({
  reducer: {
    // abonoment:abonomentSlice,
    auth:authSlice,
    role:roleSlice,
    // token:tokenSlice,
    // gymsfilial:gymsfilial,
    // gymssubscriptype:gymssubscriptype,
    // byAbonoments:gymAbomonentsChoose,
    // subscriptionAdditional:subscriptionAdditional
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch