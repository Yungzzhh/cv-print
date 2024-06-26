import { Button, Collapse, Input, Message, Popconfirm } from '@arco-design/web-react';

import { IconDelete } from '@arco-design/web-react/icon';
import { updateCompanyValue, addCompany, removeCompany } from '@/store/companyReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import { Model_Company } from '@/model';
import './index.scss'
import CustomEditor from '@/components/editor';
import { MonthPicker } from '@/components/MonthPicker';
import { TimeType } from '@/model/common';

const CollapseItem = Collapse.Item;

const Company = () => {
    const { list } = useSelector((state: any) => state.company)
    const dispatch = useDispatch()

    return (
        <div>
            <div className='companyMsg-btn'>
                <Button type='primary' onClick={() => dispatch(addCompany())}>添加工作经历</Button>
            </div>
            {list.length > 0 ? (
                <Collapse>
                    {list.map((company: Model_Company.CompanyList) => (
                        <CollapseItem
                            key={company.order}
                            header={company.companyName ? company.companyName : '请输入公司名称'}
                            name={company.order.toString()}
                            extra={<OperateCompanyList companyMsg={company} />}
                        >
                            <CompanyDetail companyMsg={company} />
                        </CollapseItem>
                    ))}
                </Collapse>
            ) : (<></>)}
        </div>
    )
};

interface CompanyDetailProps {
    companyMsg: Model_Company.CompanyList
}

type CompanyListKeys = keyof Model_Company.CompanyList;

const CompanyDetail: FC<CompanyDetailProps> = ({ companyMsg }) => {
    const dispatch = useDispatch();
    const changeCompanyMsg = (val: string, key: CompanyListKeys) => {
        dispatch(updateCompanyValue({
            changedKey: key,
            order: companyMsg.order,
            content: val
        }))
    }

    return (
        <div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>公司名称：</div>
                <Input
                    onChange={(val) => changeCompanyMsg(val, 'companyName')}
                    allowClear
                    value={companyMsg.companyName}
                    placeholder='Please enter company name'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>部门：</div>
                <Input
                    onChange={(val) => changeCompanyMsg(val, 'department')}
                    allowClear
                    value={companyMsg.department}
                    placeholder='Please enter company name'
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>起止时间：</div>
                <MonthPicker
                    time={[companyMsg.startTime, companyMsg.endTime]}
                    changeTime={(val: TimeType) => {
                        if (!val) return;
                        changeCompanyMsg(val[0], 'startTime')
                        changeCompanyMsg(val[1], 'endTime')
                    }}
                />
            </div>
            <div className='companyMsg-block'>
                <div className='companyMsg-block__text'>负责内容：</div>
                <div className='companyMsg-content'>
                    <CustomEditor content={companyMsg.content} onChange={(val) => changeCompanyMsg(val, 'content')} />
                </div>
            </div>
        </div>

    )
}

const OperateCompanyList: FC<CompanyDetailProps> = ({ companyMsg }) => {
    const dispatch = useDispatch()
    return (
        <Popconfirm
            focusLock
            title='Confirm'
            content='Are you sure you want to delete?'
            onOk={() => {
                dispatch(removeCompany({ order: companyMsg.order }))
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

export default Company;



