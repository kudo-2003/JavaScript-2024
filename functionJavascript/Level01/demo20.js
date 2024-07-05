function fchown(fd, uid, gid, callback) {
    validateInteger(uid, 'uid', -1, kMaxUserId);
    validateInteger(gid, 'gid', -1, kMaxUserId);
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.fchown(fd, uid, gid, req);
}