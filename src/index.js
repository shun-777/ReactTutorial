//react ライブラリから Reactを読み込み
import React from 'react';
//Web ブラウザとやり取りするための React ライブラリ (React DOM)を読み込み
import ReactDOM from 'react-dom/client';
//CSSを読み込み
import './index.css';
//App.jsを読み込み
import App from './App';
//reportWebVitalsを読み込み
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
