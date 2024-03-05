import '@wangeditor/editor/dist/css/style.css' // 引入 css
import './index.scss'
import { useState, useEffect, FC } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

interface CvEditorProps {
    content: string,
    onChange: (val: string) => void
}

const CustomEditor: FC<CvEditorProps> = ({content, onChange}) => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={content}
                    onCreated={setEditor}
                    onChange={editor => onChange(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
            </div>
        </>
    )
}

export default CustomEditor