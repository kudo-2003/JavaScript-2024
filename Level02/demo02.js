function mkdir(path, options, callback) {
    let mode = 0o777;
    let recursive = false;
    if (typeof options === 'function') { callback = options;}   
    else if (typeof options === 'number' || typeof options === 'string') { mode = options; }
    else if (options) {
      if (options.recursive !== undefined)
        recursive = options.recursive;
      if (options.mode !== undefined)
        mode = options.mode;
    }
    callback = makeCallback(callback);
    path = getValidatedPath(path);
    validateBoolean(recursive, 'options.recursive');
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.mkdir(
        pathModule.toNamespacedPath(path),
        parseFileMode(mode, 'mode'), recursive, req);
}