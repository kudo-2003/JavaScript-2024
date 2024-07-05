function chown(path, uid, gid, callback) {
    callback = makeCallback(callback);
    path = getValidatedPath(path);
    validateInteger(uid, 'uid', -1, kMaxUserId);
    validateInteger(gid, 'gid', -1, kMaxUserId);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.chown(pathModule.toNamespacedPath(path), uid, gid, req);
}