const path = require('path');

const { app, BrowserWindow } = require('electron');

function createWindow() {
	const win = new BrowserWindow({
		width: screen.width,
		height: screen.height,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	if (app.isPackaged) {
		win.loadFile(path.join(__dirname, "../build/index.html"));
	} else {
		win.loadURL("http://localhost:3000")
	}
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});