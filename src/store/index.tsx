import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './infoReducer.ts';
import skillsReducer from './skillsReducer.ts';
import companyReducer from './companyReducer.ts';
import projectReducer from './projectReducer.ts';
import eduReducer from './eduReducer.ts';

const store = configureStore({
  reducer: {
    personalInfo: infoReducer,
    skills: skillsReducer,
    company: companyReducer,
    project: projectReducer,
    edu: eduReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;