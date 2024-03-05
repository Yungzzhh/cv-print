import { forwardRef } from 'react';
import ReactToPrint from 'react-to-print';
import './index.scss'

import SectionTabs from '@/components/Tabs';

interface CvEditorProps {
    ref: any;
}

export const CvEditor: React.FC<CvEditorProps> = forwardRef((props, ref: any) => {

    return (
        <div className='editor-container'>
            <div className="editor-header">
                <div>
                    导出名称：<input type="text" />
                </div>
                <div className='header-right'>
                    <div className='right-save'>save</div>
                    <div className='right-print'>
                        <ReactToPrint
                            trigger={() => (<div>export</div>)}
                            content={() => ref.current}
                        />
                    </div>
                </div>
            </div>
            <div className="editor-section">
                <SectionTabs />
            </div>
        </div>
    )
})

