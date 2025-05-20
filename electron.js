import { app, BrowserWindow } from 'electron';
import process from 'process'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  
    win.loadURL('http://localhost:5173/');
}

app.whenReady().then(() => {
  console.log('App ready');
  createWindow();
});

app.on('window-all-closed', () => {
    console.log('All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  console.log('App quit');
});