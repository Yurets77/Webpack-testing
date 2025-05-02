import {useState} from 'react';
import * as modCss from './App.module.css'; // благодаря global.d.ts(global definition) импортируется css модуль
import {Link, Outlet} from "react-router-dom";


export const App = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1)
    return (
        <div>
            <Link to={'/About'}>About</Link> 
            <br/>
            <Link to={'/Shop'}>Shop</Link>
            <h1 className={modCss.value}>{count}</h1>
            <button className={modCss.button} onClick={increment}>
                <span>click on me</span>
            </button>
            <h1>Some text</h1>
            <Outlet/>
        </div>
    );
};