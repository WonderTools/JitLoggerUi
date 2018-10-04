import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/SortableTbl.css'
import JitloggerUI from './components/JitLoggerUI'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<JitloggerUI />, document.getElementById('root'));
registerServiceWorker();
