function copyFile(src, dest, mode, callback) {
    if (typeof mode === 'function') { callback = mode; mode = 0; };
    src = getValidatedPath(src, 'src');
    dest = getValidatedPath(dest, 'dest');
    src = pathModule.toNamespacedPath(src);
    dest = pathModule.toNamespacedPath(dest);
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.copyFile(src, dest, mode, req);
}