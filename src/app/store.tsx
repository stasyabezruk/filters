import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import logger from "redux-logger";
import rootReducer from "src/app/rootReducer";


const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
    }),
    logger,
];

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>