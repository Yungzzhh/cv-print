import { Model_Edu } from "@/model"
import { addEdu, removeEdu, updateEduList } from "@/store/eduReducer"
import { Button, Collapse, Input, Message, Popconfirm } from "@arco-design/web-react"
import { IconDelete } from "@arco-design/web-react/icon";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux"
import '../Company/index.scss'
import { MonthPicker } from "../MonthPicker";
import { TimeType } from "@/model/common";


const CollapseItem = Collapse.Item;

const Edu = () => {
    const dispatch = useDispatch()
    const { list } = useSelector((state: any) => state.edu)

    return (
        <>
            <div className='companyMsg-btn'>
                <Button type='primary' onClick={() => dispatch(addEdu())}>添加学历</Button>
            </div>
            {
                list.length > 0 ? (
                    <Collapse>
                        {list.map((edu: Model_Edu.EduItem) => (
                            <CollapseItem
                                key={edu.order}
                                header={edu.school ? edu.school : '请输入学校名称'}
                                name={edu.order.toString()}
                                extra={<OperateEduList msg={edu} />}
                            >
                                <EduDetail msg={edu} />
                            </CollapseItem>
                        ))}
                    </Collapse>
                ) : (<></>)
            }
        </>
    )
}

interface CollapseItemProps {
    msg: Model_Edu.EduItem
}

type EduItemKeys = keyof Model_Edu.EduItem;

const EduDetail: FC<CollapseItemProps> = ({ msg }) => {
    const dispatch = useDispatch();
    const changeEduMsg = (val: string, key: EduItemKeys) => {
        dispatch(updateEduList({
            changedKey: key,
            order: msg.order,
            content: val
        }))
    }

    return (
        <>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>学校名称：</div>
                <Input
                    onChange={(val) => changeEduMsg(val, 'school')}
                    allowClear
                    value={msg.school}
                    placeholder='Please enter school name'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>专业：</div>
                <Input
                    onChange={(val) => changeEduMsg(val, 'major')}
                    allowClear
                    value={msg.major}
                    placeholder='Please enter the major'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>学位：</div>
                <Input
                    onChange={(val) => changeEduMsg(val, 'degree')}
                    allowClear
                    value={msg.degree}
                    placeholder='Please enter degree'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>起止时间：</div>
                <MonthPicker
                    time={[msg.startTime, msg.endTime]}
                    changeTime={(val: TimeType) => {
                        if (!val) return;
                        changeEduMsg(val[0], 'startTime')
                        changeEduMsg(val[1], 'endTime')
                    }}
                />
            </div>
        </>

    )
}

const OperateEduList: FC<CollapseItemProps> = ({ msg }) => {
    const dispatch = useDispatch()
    return (
        <Popconfirm
            focusLock
            title='Confirm'
            content='Are you sure you want to delete?'
            onOk={() => {
                dispatch(removeEdu({ order: msg.order }))
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


export default Edu