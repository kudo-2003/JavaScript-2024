function futimes(fd, atime, mtime, callback) {
    atime = toUnixTimestamp(atime, 'atime');
    mtime = toUnixTimestamp(mtime, 'mtime');
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.futimes(fd, atime, mtime, req);
}