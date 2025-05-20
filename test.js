import { app, BrowserWindow } from 'electron';
import process from 'process'

async function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  await win.loadURL('data:text/html,<h1>Hello Electron!</h1>');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
