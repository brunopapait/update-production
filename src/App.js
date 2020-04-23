import React from 'react';
import { useSelector } from 'react-redux';

import { SW_INIT, SW_UPDATE } from './types';
import Alert from './Alert';
import logo from './logo.svg';
import './App.css';

function App() {
  const isServiceWorkerInitialized = useSelector(
    state => state.serviceWorkerInitialized,
  );
  const isServiceWorkerUpdated = useSelector(
    state => state.serviceWorkerUpdated,
  );
  const serviceWorkerRegistration = useSelector(
    state => state.serviceWorkerRegistration,
  );

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="App">
      <div className="App-alert">
        {isServiceWorkerInitialized && (
          <Alert text="Service Worker is initialized for the first time" type={SW_INIT} />
        )}
        {isServiceWorkerUpdated && (
          <Alert
            text="There is a new version available."
            buttonText="Update"
            type={SW_UPDATE}
            onClick={updateServiceWorker}
          />
        )}
      </div>

      <header className="App-header">
        <div>
          <h1>OLÁ MEUS AMIGOS, BELEZAAAA</h1>
          <h1>OPA, TUDO NA SANTA PAZ !</h1>
          <h1>VAMOS FAZER ESSE NEGOCIO RODAR AGORA</h1>
          <h1>4, 5, 6</h1>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          isServiceWorkerInitialized:{' '}
          {JSON.stringify(isServiceWorkerInitialized)}
        </p>
        <p>isServiceWorkerUpdated: {JSON.stringify(isServiceWorkerUpdated)}</p>
      </header>
    </div>
  );
}

export default App;