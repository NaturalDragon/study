import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// function Index(){
//   return<div className="wrapper" title='wode'>1</div>
// }
console.log(ReactDOM)

//ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App/>)
ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
