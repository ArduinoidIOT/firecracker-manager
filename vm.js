const Firecracker = require('firecrackerode-pty');
const { nanoid } = require('nanoid');
const config = require('./config');
class VM {
    constructor(tmpdir) {
        this.firecrackerVM = new Firecracker({socketPath: tmpdir + nanoid() + "-firecracker.socket"})
        this.disks = {}
    }
    async spawn() {
        this.process = await this.firecrackerVM.spawn(config.firecracker_path)
        this.process.onData(console.log)
    }
    initBootSource() {
        return this.firecrackerVM.bootSource(
            {
                'kernel_image_path': config.vmlinux_path,
                'boot_args': config.kcmdline
            }
        )
    }
    async initDisks(disks) {
        for (const [name, data] in disks) {
            var drive = this.firecrackerVM.drive(name);
            await drive.updatePreboot(
                data
            )
        }
        var drive = this.firecrackerVM.drive('rootfs');
        return drive.updatePreboot({
            'path_on_host': config.rootfs_path,
            'is_root_device': true,
            'is_read_only': true
        });
    }
    getPTY() {
        return this.process;
    }
    startInstance() {
        return this.firecrackerVM.action('InstanceStart')
    }
    stopInstance() {
        return this.firecrackerVM.action('SendCtrlAltDel')
    }
}
module.exports = {
    VM: VM
}