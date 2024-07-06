function fdatasync(fd, callback) {
    const req = new FSReqCallback();
    req.oncomplete = makeCallback(callback);
    binding.fdatasync(fd, req);
}