function close(fd, callback = defaultCloseCallback) {
    if (callback !== defaultCloseCallback) callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.close(fd, req);
}