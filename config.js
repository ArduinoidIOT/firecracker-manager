
module.exports = {
    firecracker_path: "/opt/firecracker/firecracker/build/cargo_target/x86_64-unknown-linux-musl/release/firecracker",
    rootfs_path: "/opt/firecracker/rootfs.squashfs",
    vmlinux_path: "/opt/firecracker/vmlinux",
    kcmdline: "console=ttyS0 reboot=k panic=1 pci=off quiet"
}