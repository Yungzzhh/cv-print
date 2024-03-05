import { Model_PersonalInfo } from "@/model";
import { updateValue } from "@/store/infoReducer";
import { Input } from "@arco-design/web-react";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfo = () => {
    const {infoList} = useSelector((state: any) => state.personalInfo)
    const dispatch = useDispatch();

    const changeNameInput = (value: string, key: Model_PersonalInfo.PersonInfoKey) => {
        dispatch(updateValue({
            key,
            value
        }))
    }

    return (
        <>
            {infoList.map((section: Model_PersonalInfo.PersonalInfoList) => (
                <div key={section.key} style={{marginBottom: '16px'}}>
                    <div style={{marginBottom: '4px'}}>{section.infoOption}: </div>
                    <Input 
                        onChange={(val, _e) => changeNameInput(val, section.key)}
                        value={section.context} 
                        allowClear  
                        placeholder='Please Enter something' 
                    />
                </div>
            ))}
        </>
    )
}

export default PersonalInfo