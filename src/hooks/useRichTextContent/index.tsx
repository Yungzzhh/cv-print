import { useDispatch, useSelector } from "react-redux"


const useRichTextContent = (key: any, changeFunction: any) => {
    const val = useSelector((state: any) => state[key])
    const dispatch = useDispatch()
    const changeVal = (val: any) => {
        dispatch(changeFunction(val))
    }

    return [val, changeVal]
}

export default useRichTextContent