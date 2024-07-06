function readvSync(fd, buffers, position) {
    fd = getValidatedFd(fd);
    validateBufferArray(buffers);
    if (typeof position !== 'number') position = null;
    return binding.readBuffers(fd, buffers, position);
}