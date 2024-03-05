import { Model_Company } from "@/model";
import { createListOperateReducer } from './common';

const projectList = createListOperateReducer('company', Model_Company.CompanyList)

export const {
    updateListValue: updateCompanyValue,
    addItem: addCompany,
    removeItem: removeCompany,
    initialization
} = projectList.actions;

export default projectList.reducer

