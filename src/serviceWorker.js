if ('serviceWorker' in navigator &&
    process.env.NODE_ENV !== 'production' &&
    navigator.serviceWorker.controller) {
  // Display some sort of message about the page being loaded by the service worker.
} 
