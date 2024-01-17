import {combineReducers, configureStore} from '@reduxjs/toolkit';
import abonomentSlice from './slices/abonomentSlice';
import authSlice from './slices/authSlice';
import roleSlice from './slices/roleSlice';
import tokenSlice from './slices/tokenSlice';
import gymsfilial from './slices/abonomentsFilial';
import gymssubscriptype from './slices/abonomentSubscriptTypeslice';
import gymAbomonentsChoose from './slices/abonomentsChoose';
import subscriptionAdditional from './slices/abonomentAdditionalType';
import subscripUser from './slices/subscripUser';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {listenerMiddleware} from './middleware';

export const rootReducer = combineReducers({
  abonomentSlice,
  authSlice,
  roleSlice,
  tokenSlice,
  gymsfilial,
  gymssubscriptype,
  gymAbomonentsChoose,
  subscriptionAdditional,
  subscripUser,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(listenerMiddleware.middleware),
});

//types
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// Trainer
// 77756830757
// 123

// Top manager
// 0778136469
// 123456

// User
// 7089990011
// 123

// Trainer
// 7772223344
// 123

// ADMIN
// 7771112233
// 123
