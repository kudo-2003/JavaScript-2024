function fsync(fd, callback) {
    const req = new FSReqCallback();
    req.oncomplete = makeCallback(callback);
    binding.fsync(fd, req);
}