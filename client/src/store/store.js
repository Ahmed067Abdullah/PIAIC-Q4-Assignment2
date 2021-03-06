
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import main from './mainSlice';
import pets from '../containers/Pets/Pets.slice';

export const store = configureStore({
  reducer: {
    main,
    pets
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
});