import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user', 'chat', 'chatPanel'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // ya viene con thunk y otros dos por defecto
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddlewares)
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
