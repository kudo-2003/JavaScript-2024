function open(path, flags, mode, callback) {
    path = getValidatedPath(path);
    if (arguments.length < 3) { callback = flags; flags = 'r'; mode = 0o666;
    } else if (typeof mode === 'function') { callback = mode; mode = 0o666;
    } else { mode = parseFileMode(mode, 'mode', 0o666); }
    const flagsNumber = stringToFlags(flags);
    callback = makeCallback(callback);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.open(pathModule.toNamespacedPath(path), flagsNumber, mode,req);
}