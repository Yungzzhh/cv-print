// FormatterBtn.tsx 
import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { SlateEditor } from '@wangeditor/editor';

class FormatterBtn implements IButtonMenu {
  title = '格式刷';
  tag = 'button'; // JS 语法
  iconSvg = '<svg t="1665739261235" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6325" width="200" height="200"><path d="M1024 1012.48a2119.68 2119.68 0 0 1-45.312-409.6v-228.864a145.92 145.92 0 0 0-146.944-146.176h-128v-128a100.096 100.096 0 0 0-99.84-99.84h-182.016a100.608 100.608 0 0 0-100.352 99.84v128h-128a145.92 145.92 0 0 0-145.664 146.176v228.608a2139.904 2139.904 0 0 1-45.312 409.6L0 1024h1024zM421.888 99.84h182.016v128h-182.272v-128z m274.432 742.4l3.328-146.944a51.2 51.2 0 0 0-25.6-43.52 48.896 48.896 0 0 0-51.2 0 51.2 51.2 0 0 0-25.6 43.52l-2.304 121.344-4.352 69.12L588.8 921.6h-185.856a532.992 532.992 0 0 0 23.296-160.256 51.2 51.2 0 1 0-100.096 0A420.352 420.352 0 0 1 296.448 921.6H120.832l2.304-13.824a2033.92 2033.92 0 0 0 25.6-307.2v-39.168h728.576v67.072a2063.104 2063.104 0 0 0 25.6 281.6l2.304 13.824h-216.064zM877.312 460.8H148.48v-91.392a45.568 45.568 0 0 1 45.312-40.96h642.56a45.312 45.312 0 0 1 40.96 45.312z" p-id="6326"></path></svg>';

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(): string | boolean {
    return '';
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: any): boolean {
    return !!editor?.copyStyleObject;
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    return !editor.getSelectionText();
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor) {
    if (this.isDisabled(editor)) {
      return;
    }
    
    (editor as any).copyStyleObject = SlateEditor.marks(editor);
  }
}

export default FormatterBtn;
