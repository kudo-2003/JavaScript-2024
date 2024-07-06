function readv(fd, buffers, position, callback) {
    function wrapper(err, read) { callback(err, read || 0, buffers); };
    fd = getValidatedFd(fd);
    validateBufferArray(buffers);
    callback ||= position;
    validateFunction(callback, 'cb');
    const req = new FSReqCallback();
    req.oncomplete = wrapper;
    if (typeof position !== 'number') position = null;
    binding.readBuffers(fd, buffers, position, req);
}