import {useState} from 'react';
import './App.css';

export const App = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1)
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>tap</button>
            <h1>Hello World!</h1>
        </div>
    );
};

