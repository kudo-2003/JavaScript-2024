function fstat(fd, options = { bigint: false }, callback) {
    if (typeof options === 'function') { callback = options; options = kEmptyObject; }
    callback = makeStatsCallback(callback);
    const req = new FSReqCallback(options.bigint);
    req.oncomplete = callback;
    binding.fstat(fd, options.bigint, req);
}