const { VMManager } = require("./vmmanager");
vmManagerInstance = new VMManager();
vmName = vmManagerInstance.createVM()
vmManagerInstance.initializeVM(vmName)  