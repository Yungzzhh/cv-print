// 在Redux Toolkit中创建一个slice来管理输入框的状态
import { Model_Project } from "@/model";
import { createSlice } from "@reduxjs/toolkit";

// 定义类作为类型声明
class CustomClass {
    // 自定义的类属性和方法
    constructor() {
        
    }
  }

export function createListOperateReducer<T extends CustomClass>(name: string, InitialItemState: new (order: number) => T) {
    const list: T[] = []
    return createSlice({
        name,
        initialState: {
            list
        },
        reducers: {
            /**
             * 
             * @param state 
             * @param param1 order: 唯一值 content: 内容
             */
            updateListValue: (state, { payload }) => {
                const updatedList = state.list.map((item: any) => {
                    if (item.order === payload.order) {
                        item[payload.changedKey] = payload.content
                    }
                    return item
                })
                state.list = updatedList
            },
            addItem: (state) => {
                const newOrder = state.list.length
                const newOne = new InitialItemState(newOrder)
                state.list.push(newOne as any)
            },
            removeItem: (state, { payload }) => {
                state.list = state.list.filter((item: any) => item.order !== payload.order)
            }
        },
    });
}


const projectList = createListOperateReducer('proj', Model_Project.ProjectList)

export default projectList.reducer

export const { updateListValue: updateProjectList, addItem: addProject, removeItem: removeProject } = projectList.actions;
