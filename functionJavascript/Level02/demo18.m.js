function writev(fd, buffers, position, callback) {
    function wrapper(err, written) { callback(err, written || 0, buffers); };
    fd = getValidatedFd(fd);
    validateBufferArray(buffers);
    callback ||= position;
    validateFunction(callback, 'cb');
    if (buffers.length === 0) { process.nextTick(callback, null, 0, buffers); return; };
    const req = new FSReqCallback();
    req.oncomplete = wrapper;
    if (typeof position !== 'number') position = null;
    binding.writeBuffers(fd, buffers, position, req);
}