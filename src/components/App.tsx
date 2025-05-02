import {useState} from 'react';
import * as modCss from './App.module.css'; // благодаря global.d.ts(global definition) импортируется css модуль

export const App = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1)
    return (
        <div>
            <h1 className={modCss.value}>{count}</h1>
            <button className={modCss.button} onClick={increment}>
                <span>click on me</span>
            </button>
            <h1>Some text</h1>
        </div>
    );
};