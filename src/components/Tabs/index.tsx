import { Tabs } from '@arco-design/web-react';
import { FC, Suspense, lazy, useRef, useState } from 'react';
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { sortList } from '@/store/tabsReducer';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Identifier, XYCoord } from 'dnd-core';
import { Model_Tabs } from '@/model';

const TabPane = Tabs.TabPane;
const PersonalInfo = lazy(() => import('@/components/PersonalInfo'))
const Skills = lazy(() => import('@/components/Skills'))
const Company = lazy(() => import('@/components/Company'))
const Proj = lazy(() => import('@/components/Proj'))
const Edu = lazy(() => import('@/components/Edu'))

const SectionTabs: FC = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state: any) => state.tabs)
    const [currentSection, setCurrentSection] = useState('personalInfo')
    const setCurrentTab = (key: string) => {
        setCurrentSection(key)
    }

    // 拖拽移动功能
    const moveTabNode = (dragIndex: number, hoverIndex: number) => {
        if (dragIndex === 0 || hoverIndex === 0) return;
        const newCards = [...list];

        newCards.splice(hoverIndex, 0, ...newCards.splice(dragIndex, 1));
        const res: any = newCards.map(item => {
            return {
                ...item
            }
        })

        res[hoverIndex].position = hoverIndex
        res[dragIndex].position = dragIndex


        dispatch(sortList(res));
    }

    // 渲染tab内容
    const sectionComponentMap = {
        personalInfo: <PersonalInfo />,
        skills: <Skills />,
        company: <Company />,
        proj: <Proj />,
        edu: <Edu />
    }
    const renderTabContent = (key: keyof typeof sectionComponentMap) => {
        return sectionComponentMap[key]
    }

    const { isCN } = useSelector((state: any) => state.tabs)

    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs defaultActiveTab='personalInfo' activeTab={currentSection} onClickTab={setCurrentTab}>
                {list.length > 0 && list.map((section: Model_Tabs.Tabs, index: number) => (
                    <TabPane
                        key={section.key}
                        title={
                            <WrapTabNode key={index} index={index} moveTabNode={moveTabNode}>
                                {isCN ? section.sectionName : section.sectionNameEn}
                            </WrapTabNode>
                        }
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            {renderTabContent(section.key)}
                        </Suspense>
                    </TabPane>
                ))}
            </Tabs>
        </DndProvider>
    );
};

interface WrapTabNodeProps {
    index: number;
    moveTabNode: (dragIndex: number, hoverIndex: number) => void;
    children: React.ReactNode;
}

interface DragItem {
    index: number;
}

const WrapTabNode = (props: WrapTabNodeProps) => {
    const { index, moveTabNode, children, ...elseProps } = props;

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'DND_NODE',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            moveTabNode(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });

    const [, drag] = useDrag({
        type: 'DND_NODE',
        item: () => {
            return { index };
        }
    });

    drag(drop(ref));

    return (
        <div ref={ref} data-handler-id={handlerId} {...elseProps}>
            {children}
        </div>
    );
};

export default SectionTabs;


