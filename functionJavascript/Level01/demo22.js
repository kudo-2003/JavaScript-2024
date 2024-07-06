function fchmod(fd, mode, callback) {
    mode = parseFileMode(mode, 'mode');
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.fchmod(fd, mode, req);
}