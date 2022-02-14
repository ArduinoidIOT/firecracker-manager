const { nanoid } = require("nanoid")
const { VM } = require("./vm")
class VMManager {
    constructor() {
        this.vmTable = {}
        this.tmpdir = os.tmpdir() + '/' + nanoid() + '/'
        fs.mkdir(this.tmpdir, () => {})
    }
    createVM() {
        var id = nanoid()
        this.vmTable[id] = new VM(this.tmpdir)
        return id
    }
    async deleteVM(id) {
        var vm = this.accessVM(id)
        await vm.stopInstance()
        this.vmTable.delete(id)
    }
    accessVM(id) {
        return this.vmTable[id]
    }
    async initializeVM(id) {
        var vm = this.accessVM(id)
        await vm.spawn()
        await vm.initBootSource()
        await vm.initDisks({})
        await vm.startInstance()
    }
}
module.exports = {
    VMManager: VMManager
}