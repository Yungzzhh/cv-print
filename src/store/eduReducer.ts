import { Model_Edu } from "@/model";
import { createListOperateReducer } from './common';

const eduList = createListOperateReducer('edu', Model_Edu.EduItem)

export default eduList.reducer

export const {
    updateListValue: updateEduList, 
    addItem: addEdu, 
    removeItem: removeEdu,
    initialization
} = eduList.actions;
