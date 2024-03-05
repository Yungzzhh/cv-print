import './App.scss'
import { CvPreview } from './pages/cv-preview/index';
import { CvEditor } from './pages/cv-editor/index';
import { useRef } from 'react';

function App() {
  const previewDom = useRef()

  return (
    <div className='container'>
      <div className='preview-container' >
        <CvPreview ref={previewDom} />
      </div>
      <CvEditor ref={previewDom} />
    </div>
  )
}

export default App
