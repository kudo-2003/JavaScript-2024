function chmod(path, mode, callback) {
    path = getValidatedPath(path);
    mode = parseFileMode(mode, 'mode');
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.chmod(pathModule.toNamespacedPath(path), mode, req);
}