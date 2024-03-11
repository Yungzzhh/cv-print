// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { createSlice } from "@reduxjs/toolkit";

export const personalInfo = createSlice({
  name: 'skills',
  initialState: {
    content: ''
  },
  reducers: {
    updateSkillValue: (state, {payload}) => {
      state.content = payload
    },
    initialization: (state, {payload}) => {
      state.content = payload ? payload.content : ''
    }
  },
});

export const { updateSkillValue, initialization } = personalInfo.actions;

export default personalInfo.reducer;
