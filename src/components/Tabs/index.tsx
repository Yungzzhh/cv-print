import { Tabs } from '@arco-design/web-react';
import { FC, Suspense, lazy, useState } from 'react';

type Section = keyof typeof sectionComponentMap;

const TabPane = Tabs.TabPane;

interface SectionList {
    sectionName: string;
    key: Section
}

const PersonalInfo = lazy(() => import('@/components/PersonalInfo'))
const Skills = lazy(() => import('@/components/Skills'))
const Company = lazy(() => import('@/components/Company'))
const Proj = lazy(() => import('@/components/Proj'))
const Edu = lazy(() => import('@/components/Edu'))

const sectionComponentMap = {
    personalInfo: <PersonalInfo />,
    skills: <Skills />,
    company: <Company />,
    proj: <Proj />,
    edu: <Edu />
}

const SectionTabs: FC = () => {
    const [currentSection, setCurrentSection] = useState('personalInfo')

    const setCurrentTab = (key: string) => {
        setCurrentSection(key)
    }

    const renderTabContent = (key: Section) => {
        return sectionComponentMap[key]
    }

    const sectionList: SectionList[] = [
        {
            sectionName: '个人信息',
            key: 'personalInfo',
        }, {
            sectionName: '专业技能',
            key: 'skills',
        }, {
            sectionName: '工作经历',
            key: 'company',
        }, {
            sectionName: '项目经历',
            key: 'proj',
        }, {
            sectionName: '教育经历',
            key: 'edu',
        },
    ]

    return (
        <Tabs defaultActiveTab='personalInfo' activeTab={currentSection} onClickTab={setCurrentTab}>
            {sectionList.map(section => (
                <TabPane
                    key={section.key}
                    title={section.sectionName}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        {renderTabContent(section.key)}
                    </Suspense>
                </TabPane>
            ))}
        </Tabs>
    );
};

export default SectionTabs;
