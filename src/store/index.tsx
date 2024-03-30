import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './infoReducer.ts';
import skillsReducer from './skillsReducer.ts';
import companyReducer from './companyReducer.ts';
import projectReducer from './projectReducer.ts';
import eduReducer from './eduReducer.ts';
import tabsReducer from './tabsReducer.ts'

const store = configureStore({
  reducer: {
    personalInfo: infoReducer,
    skills: skillsReducer,
    company: companyReducer,
    project: projectReducer,
    edu: eduReducer,
    tabs: tabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;