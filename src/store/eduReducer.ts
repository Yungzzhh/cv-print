import { Model_Edu } from "@/model";
import { createListOperateReducer } from "./listOperateReducer";

const eduList = createListOperateReducer('edu', Model_Edu.EduItem)

export default eduList.reducer

export const { updateListValue: updateEduList, addItem: addEdu, removeItem: removeEdu } = eduList.actions;
