import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home.tsx";
import '../utils/colors.css'

import './globalStyles.scss'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className='container'>

            <Home/>

        </div>
    </React.StrictMode>
,
)
