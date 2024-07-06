function ftruncate(fd, len = 0, callback) {
    if (typeof len === 'function') { callback = len; len = 0; }
    validateInteger(len, 'len');
    len = MathMax(0, len);
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.ftruncate(fd, len, req);
}
  