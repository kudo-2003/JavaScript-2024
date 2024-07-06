function readdir(path, options, callback) {
    callback = makeCallback(typeof options === 'function' ? options : callback);
    options = getOptions(options);
    path = getValidatedPath(path);
    if (options.recursive != null) { validateBoolean(options.recursive, 'options.recursive'); };
    if (options.recursive) { callback(null, readdirSyncRecursive(path, options)); return; };
    const req = new FSReqCallback();
    if (!options.withFileTypes) { req.oncomplete = callback; }
    else {
      req.oncomplete = (err, result) => {
        if (err) { callback(err); return; }
        getDirents(path, result, callback);
      };
    }
    binding.readdir(pathModule.toNamespacedPath(path), options.encoding, !!options.withFileTypes, req);
}