function access(path, mode, callback) {
    if (typeof mode === 'function') { callback = mode; mode = F_OK; }
    path = getValidatedPath(path);
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.access(pathModule.toNamespacedPath(path), mode, req);
}