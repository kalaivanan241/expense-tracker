import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider} from "@speechly/react-client";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Provider from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="0853f310-88df-4cad-9dd8-2133ddaa32f3" language="en-US">
    <Provider>
      <App />
    </Provider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
