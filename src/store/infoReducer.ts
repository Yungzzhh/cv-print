// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { createSlice } from "@reduxjs/toolkit";

export const personalInfo = createSlice({
  name: 'personalInfo',
  initialState: {
    infoList: [
      {
        key: 'name',
        infoOption: '姓名',
        context: '容志和',
      }, {
        key: 'phone',
        infoOption: '电话',
        context: '18022989193',
      }, {
        key: 'email',
        infoOption: '邮箱',
        context: '782494187@qq.com',
      }
    ]
  },
  reducers: {
    updateValue: (state, {payload}) => {
      const updatedList = state.infoList.map(info => {
        if(info.key === payload.key) {
          info.context = payload.value
        }
        return info
      })
      state.infoList = updatedList
    },
  },
});

export const { updateValue } = personalInfo.actions;

export default personalInfo.reducer;
