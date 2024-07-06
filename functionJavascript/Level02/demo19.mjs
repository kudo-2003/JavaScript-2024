function writevSync(fd, buffers, position) {
    fd = getValidatedFd(fd);
    validateBufferArray(buffers);
    if (buffers.length === 0) { return 0; }
    if (typeof position !== 'number') position = null;
    return binding.writeBuffers(fd, buffers, position);
}