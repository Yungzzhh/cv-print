
import { useSelector } from 'react-redux';
import { forwardRef } from "react";
import './index.scss'
import { PersonalInfoList } from '@/model/personalInfo';
import { Model_Company, Model_Edu, Model_Project } from '@/model';

export const CvPreview = forwardRef((_props, ref: any) => {
    const { list: infoList } = useSelector((state: any) => state.personalInfo)

    const infoMap: any = {};
    infoList.forEach((info: PersonalInfoList) => {
        infoMap[info.key] = info;
    });

    const name = infoMap['name'];
    const phone = infoMap['phone'];
    const email = infoMap['email'];

    const { content: skillsContent } = useSelector((state: any) => state.skills)

    return (
        <div ref={ref} id="pdfViewId" className="preview-inner">
            <div className='preview-section'>
                <div className='personal'>
                    <div className='personal-name'>{name.context}</div>
                    <div className='personal-info'>
                        {phone.context && <div><span className='personal-info__title'>电话</span>:{phone.context}</div>}
                        {email.context && <div><span className='personal-info__title'>邮箱</span>:{email.context}</div>}
                    </div>
                </div>
                <div className='skills'>
                    <SectionHeader name='专业技能' />
                    <RichTextRender content={skillsContent} />
                </div>
                <div className='company'>
                    <SectionHeader name='工作经历' />
                    <CompanyPart />
                </div>
                <div className='project'>
                    <SectionHeader name='项目经历' />
                    <ProjectPart />
                </div>
                <div className='edu'>
                    <SectionHeader name='教育经历' />
                    <EduPart />
                </div>

            </div>
        </div>
    )
})


interface SectionHeaderProp {
    name: string;
    // icon?: JSX.Element;
}
function SectionHeader(prop: SectionHeaderProp) {
    return (
        <div className="header weight">
            <span className="header-name">{prop.name}</span>
        </div>
    );
}

interface NameWithTimeProps {
    name: string;
    startTime: string;
    endTime: string;
    subName?: string;
}

function NameWithTime({ name, subName, startTime, endTime }: NameWithTimeProps) {
    return (
        <div className='preview-company__header'>
            <div className='left-part'>
                <span className='left-name'>{name}</span>
                <>  </>
                {
                    subName
                        ? <>-{subName}</>
                        : <></>
                }
            </div>
            {startTime && endTime && <div>{startTime.replaceAll('-','/')} - {endTime.replaceAll('-','/')}</div>}
        </div>
    )
}

function CompanyPart() {
    const { list: companyList } = useSelector((state: any) => state.company)
    
    return (
        <>
            {companyList.map((company: Model_Company.CompanyList) => (
                <div className='preview-company' key={company.order}>
                    <NameWithTime
                        name={company.companyName}
                        subName={company.department}
                        startTime={company.startTime}
                        endTime={company.endTime}
                    />
                    <div className='preview-company__content'>
                        <RichTextRender content={company.content} />
                    </div>
                </div>
            ))}
        </>
    )
}

function ProjectPart() {
    const { list: projectList } = useSelector((state: any) => state.project)

    return (
        <>
            {projectList.map((project: Model_Project.ProjectList) => (
                <div className='preview-company' key={project.order}>
                    <NameWithTime
                        name={project.projectName}
                        startTime={project.startTime}
                        endTime={project.endTime}
                    />
                    <div className='preview-company__content'>
                        <RichTextRender content={project.content} />
                    </div>
                </div>
            ))}
        </>
    )
}

function EduPart() {
    const { list: eduList } = useSelector((state: any) => state.edu)
    return (
        <>
            {eduList.map((edu: Model_Edu.EduItem) => (
                <div className='preview-company' key={edu.order}>
                    <NameWithTime
                        name={edu.school}
                        subName={edu.major}
                        startTime={edu.startTime}
                        endTime={edu.endTime}
                    />
                </div>
            ))}
        </>
    )
}

function RichTextRender({ content }: { content: string }) {
    return (
        <div className='rich-text' dangerouslySetInnerHTML={{ __html: content }} />
    )
}