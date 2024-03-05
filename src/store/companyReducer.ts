// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { Model_Company } from "@/model";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  companyList: Model_Company.CompanyList[];
}

const initialState: InitialState = {
  companyList: []
}

export const personalInfo = createSlice({
  name: 'company',
  initialState,
  reducers: {
    /**
     * 
     * @param state 
     * @param param1 order: 唯一值 content: 内容
     */
    updateCompanyValue: (state, { payload } ) => {
      const updatedList = state.companyList.map((company: any) => {
        if (company.order === payload.order) {
          company[payload.changedKey] = payload.content
        }
        return company
      })
      state.companyList = updatedList
    },
    addCompany: (state) => {
      const newOrder = state.companyList.length
      state.companyList.push(new Model_Company.CompanyList(newOrder))
    },
    removeCompany: (state, {payload}) => {
      state.companyList = state.companyList.filter(company => company.order !== payload.order)
    }
  },
});

export const { updateCompanyValue, addCompany, removeCompany } = personalInfo.actions;

export default personalInfo.reducer;
