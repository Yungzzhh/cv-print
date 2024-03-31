import { Button, Collapse, DatePicker, Input, Message, Popconfirm } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import { Model_Project } from '@/model';
import '../Company/index.scss'
import CustomEditor from '@/components/editor';
import { addProject, removeProject, updateProjectList } from '@/store/projectReducer';
import { isAfterDate } from '@/utils';
import { MonthPicker } from '@/components/MonthPicker';
import dayjs from 'dayjs';
import { TimeType } from '@/model/common';

const CollapseItem = Collapse.Item;

const Project = () => {
    const { list } = useSelector((state: any) => state.project)

    const dispatch = useDispatch()

    return (
        <div>
            <div className='companyMsg-btn'>
                <Button type='primary' onClick={() => dispatch(addProject())}>添加项目经历</Button>
            </div>
            {list.length > 0 ? (
                <Collapse>
                    {list.map((project: Model_Project.ProjectList) => (
                        <CollapseItem
                            key={project.order}
                            header={project.projectName ? project.projectName : '请输入项目名称'}
                            name={project.order.toString()}
                            extra={<OperateCompanyList msg={project} />}
                        >
                            <ProjectDetail msg={project} />
                        </CollapseItem>
                    ))}
                </Collapse>
            ) : (<></>)}
        </div>
    )
};

interface CollapseItemProps {
    msg: Model_Project.ProjectList
}

type ProjectListKeys = keyof Model_Project.ProjectList;

const ProjectDetail: FC<CollapseItemProps> = ({ msg }) => {
    const dispatch = useDispatch();
    const changeProjectMsg = (val: string, key: ProjectListKeys) => {
        dispatch(updateProjectList({
            changedKey: key,
            order: msg.order,
            content: val
        }))
    }

    return (
        <>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>项目名称：</div>
                <Input
                    onChange={(val, _e) => changeProjectMsg(val, 'projectName')}
                    allowClear
                    value={msg.projectName}
                    placeholder='Please enter project name'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>起止时间：</div>
                <MonthPicker
                    time={[msg.startTime, msg.endTime]}
                    changeTime={(val: TimeType) => {
                        if (!val) return;
                        changeProjectMsg(val[0], 'startTime')
                        changeProjectMsg(val[1], 'endTime')
                    }}
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>项目描述：</div>
                <div className='companyMsg-content'>
                    <CustomEditor content={msg.content} onChange={(val) => changeProjectMsg(val, 'content')} />
                </div>
            </div>
        </>

    )
}

const OperateCompanyList: FC<CollapseItemProps> = ({ msg }) => {
    const dispatch = useDispatch()
    return (
        <Popconfirm
            focusLock
            title='Confirm'
            content='Are you sure you want to delete?'
            onOk={() => {
                dispatch(removeProject({ order: msg.order }))
                Message.info({
                    content: 'ok',
                });
            }}
            onCancel={() => {
                Message.error({
                    content: 'cancel',
                });
            }}

        >
            <IconDelete />
        </Popconfirm >

    )
}

export default Project;



