import CustomEditor from '@/components/editor/index';
import { useRichTextContent } from '@/hooks';
import { updateSkillValue } from '@/store/skillsReducer';

const Skills = () => {
    const [skills, changeSkillsValue] = useRichTextContent('skills', updateSkillValue)

    return (
        <div>
            <CustomEditor content={skills.content} onChange={changeSkillsValue}/>
        </div>
    )
}

export default Skills