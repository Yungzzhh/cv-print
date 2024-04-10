import { createSlice } from "@reduxjs/toolkit";

const tabsReducer = createSlice({
    name: "tabsList",
    initialState: {
        list: [
            {
                sectionName: '个人信息',
                key: 'personalInfo',
                position: 0,
                sectionNameEn: 'Personal Information',
            }, {
                sectionName: '专业技能',
                key: 'skills',
                position: 1,
                sectionNameEn: 'Skills',
            }, {
                sectionName: '工作经历',
                key: 'company',
                position: 2,
                sectionNameEn: 'Work Experience',
            }, {
                sectionName: '项目经历',
                key: 'proj',
                position: 3,
                sectionNameEn: 'Project Experience',
            }, {
                sectionName: '教育经历',
                key: 'edu',
                position: 4,
                sectionNameEn: 'Education Experience',
            },
        ],
        isCN: true,
    },
    reducers: {
        sortList: (state, { payload }) => {
            state.list = payload
        },
        changeLang: (state, { payload}) => {
            console.log(payload);
            
            state.isCN = !state.isCN;
        }
    },
})


export const { sortList, changeLang } = tabsReducer.actions;

export default tabsReducer.reducer