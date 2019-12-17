const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    center: true,
    height: 400,
    width: 600
  });
  mainWindow.loadFile("./dist/index.html");
});
