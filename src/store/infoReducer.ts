// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { createSlice } from "@reduxjs/toolkit";

export const personalInfo = createSlice({
  name: 'personalInfo',
  initialState: {
    list: [
      {
        key: 'name',
        infoOption: '姓名',
        context: '',
      }, {
        key: 'phone',
        infoOption: '电话',
        context: '',
      }, {
        key: 'email',
        infoOption: '邮箱',
        context: '',
      }
    ]
  },
  reducers: {
    updateValue: (state, {payload}) => {
      const updatedList = state.list.map(info => {
        if(info.key === payload.key) {
          info.context = payload.value
        }
        return info
      })
      state.list = updatedList
    },
    initialization: (state, {payload}) => {
     
      state.list =  payload ? payload.list : [
        {
          key: 'name',
          infoOption: '姓名',
          context: '',
        }, {
          key: 'phone',
          infoOption: '电话',
          context: '',
        }, {
          key: 'email',
          infoOption: '邮箱',
          context: '',
        }
      ]
    }
  },
});

export const { updateValue, initialization } = personalInfo.actions;

export default personalInfo.reducer;
