const {contextBridge} = require('electron');
const {DateTime} = require('luxon');

contextBridge.exposeInMainWorld('luxon', { DateTime });
