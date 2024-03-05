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
  },
});

export const { updateSkillValue } = personalInfo.actions;

export default personalInfo.reducer;
