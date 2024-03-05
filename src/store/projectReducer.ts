// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { Model_Project } from "@/model";
import { createListOperateReducer } from './common';

const projectList = createListOperateReducer('proj', Model_Project.ProjectList)

export default projectList.reducer

export const { 
    updateListValue: updateProjectList, 
    addItem: addProject, 
    removeItem: removeProject,
    initialization
} = projectList.actions;
