import { createSlice } from "@reduxjs/toolkit";

const tabsReducer = createSlice({
    name: "tabsList",
    initialState: {
        list: [
            {
                sectionName: '个人信息',
                key: 'personalInfo',
                position: 0,
            }, {
                sectionName: '专业技能',
                key: 'skills',
                position: 1,
            }, {
                sectionName: '工作经历',
                key: 'company',
                position: 2,
            }, {
                sectionName: '项目经历',
                key: 'proj',
                position: 3,
            }, {
                sectionName: '教育经历',
                key: 'edu',
                position: 4,
            },
        ]
    },
    reducers: {
        sortList: (state, { payload }) => {
            state.list = payload
        }
    },
})


export const { sortList } = tabsReducer.actions;

export default tabsReducer.reducer