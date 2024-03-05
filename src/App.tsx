import './App.scss'
import { CvPreview } from './pages/cv-preview/index';
import { CvEditor } from './pages/cv-editor/index';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import store from '@/store'

function App() {
  const previewDom = useRef()

  return (
    <Provider store={store}>
      <div className='container'>
        <div className='preview-container' >
          <CvPreview ref={previewDom} />
        </div>
        <CvEditor ref={previewDom} />
      </div>
    </Provider>
  )
}

export default App
