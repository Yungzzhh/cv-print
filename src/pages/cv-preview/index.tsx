
import { useSelector } from 'react-redux';
import { forwardRef } from "react";
import './index.scss'
import { PersonalInfoList } from '@/model/personalInfo';

export const CvPreview = forwardRef((props, ref: any) => {
    const { infoList } = useSelector((state: any) => state.personalInfo)
    const infoMap: any = {};
    infoList.forEach((info: PersonalInfoList) => {
        infoMap[info.key] = info;
    });

    const name = infoMap['name'];
    const phone = infoMap['phone'];
    const email = infoMap['email'];

    const { content } = useSelector((state: any) => state.skills)

    return (

        <div ref={ref} id="pdfViewId" className="preview-inner">
            <div className='preview-section'>
                <div className='personal'>
                    <div className='personal-name'>{name.context}</div>
                    <div className='personal-info'>
                        <div><span className='personal-info__title'>电话</span>:{phone.context}</div>
                        <div><span className='personal-info__title'>邮箱</span>:{email.context}</div>
                    </div>
                </div>
                <div className='skills'>
                    <PartHeader name='专业技能' />
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div className='company'>
                    <PartHeader name='工作经历' />

                </div>
                <div className='project'>
                    <PartHeader name='项目经历' />

                </div>
                <div className='edu'>
                    <PartHeader name='教育经历' />

                </div>

            </div>
        </div>
    )
})


interface PartHeaderProp {
    name: string;
    // icon?: JSX.Element;
}
function PartHeader(prop: PartHeaderProp) {
    return (
        <div className="header weight">
            {/* <span className="header-icon">{prop.icon}</span> */}
            <span className="header-name">{prop.name}</span>
        </div>
    );
}