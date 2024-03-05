import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import store from '@/store'

import "@arco-design/web-react/dist/css/arco.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
