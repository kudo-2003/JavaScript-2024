function lstat(path, options = { bigint: false }, callback) {
    if (typeof options === 'function') { callback = options; options = kEmptyObject; };
    callback = makeStatsCallback(callback);
    path = getValidatedPath(path);
    const req = new FSReqCallback(options.bigint);
    req.oncomplete = callback;
    binding.lstat(pathModule.toNamespacedPath(path), options.bigint, req);
}
  