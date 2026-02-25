//imports react dom
//imports app which we wanna create

import ReactDOM from 'react-dom/client'
import App from './App'

//index.html ke div me jo id root hai usko pakad ke pure react app ko us div me daal diya
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)

