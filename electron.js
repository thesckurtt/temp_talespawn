import { app, BrowserWindow } from 'electron';
import process from 'process'
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

//   const indexPath = path.join(__dirname, 'dist', 'index.html');
  win.loadURL('http://localhost:5173/');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});