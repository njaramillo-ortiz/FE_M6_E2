import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(error => console.log("Error en Service Worker",
            error));
}

// Send localStorage data to the service worker
if (navigator.serviceWorker.controller) {
    const localStorageData = JSON.stringify(localStorage);
    navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_LOCALSTORAGE',
        data: localStorageData
    });
}

// Listen for messages from the service worker
navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.type === 'RETRIEVE_LOCALSTORAGE') {
        const localStorageData = JSON.parse(event.data.data);
        for (const key in localStorageData) {
            localStorage.setItem(key, localStorageData[key]);
        }
    }
});

function exportIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('my-database');
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['my-store'], 'readonly');
            const store = transaction.objectStore('my-store');
            const allRecords = store.getAll();

            allRecords.onsuccess = () => {
                resolve(JSON.stringify(allRecords.result));
            };

            allRecords.onerror = () => {
                reject('Failed to export IndexedDB data');
            };
        };
    });
}

// Send IndexedDB data to the service worker
exportIndexedDB().then((data) => {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_INDEXEDDB',
            data: data
        });
    }
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
