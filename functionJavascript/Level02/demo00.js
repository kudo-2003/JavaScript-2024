function lutimes(path, atime, mtime, callback) {
    callback = makeCallback(callback);
    path = getValidatedPath(path);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.lutimes(
        pathModule.toNamespacedPath(path),
                    toUnixTimestamp(atime),
                    toUnixTimestamp(mtime), req);
}