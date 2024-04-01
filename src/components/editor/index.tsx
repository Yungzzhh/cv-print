import '@wangeditor/editor/dist/css/style.css' // 引入 css
import './index.scss'
import { useState, useEffect, FC, useCallback, useMemo } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Boot, IButtonMenu, IEditorConfig, IToolbarConfig, SlateEditor, SlateText } from '@wangeditor/editor'
import FormatterBtn from './FormatterBtn'

interface CvEditorProps {
    content: string,
    onChange: (val: string) => void
}

let isMouseDown = false;

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
        'headerSelect',
        'blockquote',
        '|',
        'bold',
        'underline',
        'italic',
        {
          key: 'group-more-style', // 以 group 开头
          title: '更多',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
          menuKeys: ['through', 'code', 'sup', 'sub', 'clearStyle'],
        },
        'color',
        'bgColor',
        '|',
        'fontSize',
        'fontFamily',
        'lineHeight',
        '|',
        'bulletedList',
        'numberedList',
        'todo',
        {
          key: 'group-justify', // 以 group 开头
          title: '两端对齐',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
          menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
        },
        {
          key: 'group-indent', // 以 group 开头
          title: '缩进',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
          menuKeys: ['indent', 'delIndent'],
        },
        '|',
        'emotion',
        'insertLink',
        {
          key: 'group-image', // 以 group 开头
          title: '图片',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
          menuKeys: ['insertImage', 'uploadImage'],
        },
        {
          key: 'group-video', // 以 group 开头
          title: '视频',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>',
          menuKeys: ['insertVideo', 'uploadVideo'],
        },
        'insertTable',
        'codeBlock',
        'divider',
        '|',
        'undo',
        'redo',
        'formatBrush',
        '|',
        'fullScreen',
      ],
}

const menu1Conf = {
    key: 'formatBrush', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
        return new FormatterBtn() as IButtonMenu;
    },
};

// 注册格式刷菜单
Boot.registerMenu(menu1Conf);

const CustomEditor: FC<CvEditorProps> = ({ content, onChange }) => {
    // editor 实例
    // const [editor, setEditor] = useState<(IDomEditor & {copyStyleObject: any}) | null>(null)   
    const [editor, setEditor] = useState<any>(null)  

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    }

    const changeMouseDown = () => {
        isMouseDown = true;
      };
    
      const changeMouseup = useCallback(() => {
        const selectText = editor!.getSelectionText();
        if (isMouseDown && editor!.copyStyleObject && selectText) {
          // 先清除选中节点的样式
          // 获取所有 text node
          const nodeEntries = SlateEditor.nodes(editor!, {
            match: (n) => SlateText.isText(n),
            universal: true,
          });
          for (const nodeEntry of nodeEntries) {
            // 单个 text node
            const n = nodeEntry[0];
            const keys = Object.keys(n as object);
            keys.forEach((key) => {
              if (key === 'text') {
                // 保留 text 属性，text node 必须的
                return;
              }
              // 其他属性，全部清除
              SlateEditor.removeMark(editor!, key);
            });
          }
    
          // 再赋值新样式
          Object.entries(editor!.copyStyleObject).forEach(([key, value]) => {
            if (key === 'text') {
              // 保留 text 属性，text node 必须的
              return;
            }
            editor!.addMark(key, value);
          });
    
          editor!.copyStyleObject = undefined;
          isMouseDown = false;
        }
      }, [editor]);
    
    // 因为本次需求编辑器在抽屉里 开不同的抽屉会注册多个编辑器，导致编辑器的id不是一个 监听时要监听对应的编辑器，如果只有一个编辑器，这块可以删除，监听直接用w-e-textarea-1
      const domId = useMemo(() => {
        return editor?.id?.split('-')?.[1] ? `w-e-textarea-${editor?.id?.split('-')?.[1]}` : undefined;
      }, [editor]);
    
    
      useEffect(() => {
        if (domId) {
          document.getElementById(domId)?.addEventListener('mousedown', changeMouseDown);
          document.getElementById(domId)?.addEventListener('mouseup', changeMouseup);
        }
      }, [domId, changeMouseup]);
    
      useEffect(() => {
        return () => {
          document.getElementById(domId!)?.removeEventListener('mousedown', changeMouseDown);
          document.getElementById(domId!)?.removeEventListener('mouseup', changeMouseup);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
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