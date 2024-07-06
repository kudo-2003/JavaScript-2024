function fchmodSync(fd, mode) {
    binding.fchmod( fd, parseFileMode(mode, 'mode'), );
}