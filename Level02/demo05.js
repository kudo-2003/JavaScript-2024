function mkdtemp(prefix, options, callback) {
    callback = makeCallback(typeof options === 'function' ? options : callback);
    options = getOptions(options);
    prefix = getValidatedPath(prefix, 'prefix');
    warnOnNonPortableTemplate(prefix);
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.mkdtemp(prefix, options.encoding, req);
}