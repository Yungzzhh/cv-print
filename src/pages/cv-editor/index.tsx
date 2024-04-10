import { forwardRef, useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './index.scss'

import SectionTabs from '@/components/Tabs';
import { Button, Input, Message, Switch } from '@arco-design/web-react';
import { useDispatch, useSelector } from 'react-redux';
import { initialization as infoInit } from '@/store/infoReducer';
import { initialization as skillsInit } from '@/store/skillsReducer';
import { initialization as companyInit } from '@/store/companyReducer';
import { initialization as projectInit } from '@/store/projectReducer';
import { initialization as eduInit } from '@/store/eduReducer';
import { changeLang } from '@/store/tabsReducer';

interface CvEditorProps {
    ref: any;
}

export const CvEditor: React.FC<CvEditorProps> = forwardRef((_props, ref: any) => {
    const [exportName, setExportName] = useState('')

    const localData = JSON.parse(localStorage.getItem('cv') || '{}')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(infoInit(localData['personalInfo']))
        dispatch(skillsInit(localData['skills']))
        dispatch(companyInit(localData['company']))
        dispatch(projectInit(localData['project']))
        dispatch(eduInit(localData['edu']))
    }, [localData])

    const changeLanguage = () => {
        dispatch(changeLang(true))
    }


    return (
        <div className='editor-container'>
            <div className="editor-header">
                <div className='header-export'>
                    <div style={{ whiteSpace: 'nowrap' }}>导出名称：</div><Input type="text" onChange={(val) => setExportName(val)} />
                </div>
                <div className='header-right'>
                    <div className='right-save'>
                        <SaveCv />
                    </div>
                    <div className='right-print'>
                        <ReactToPrint
                            trigger={() => (<Button type='primary'>export</Button>)}
                            documentTitle={exportName}
                            content={() => ref.current}
                        />
                    </div>
                </div>
            </div>
            <div className='editor-lang'>transfer to En  <Switch onChange={() => changeLanguage()} /></div>
            <div className="editor-section">
                <SectionTabs />
            </div>
        </div>
    )
})

const SaveCv = () => {
    const store = useSelector((state: any) => state)
    const saveCvMsg = () => {
        localStorage.setItem('cv', JSON.stringify(store))
        Message.success('save message successful!');
    }
    return (
        <Button type='primary' onClick={saveCvMsg}>save</Button>
    )
}