function cp(src, dest, options, callback) {
    if (typeof options === 'function') { callback = options; options = undefined; };
    callback = makeCallback(callback);
    options = validateCpOptions(options);
    src = pathModule.toNamespacedPath(getValidatedPath(src, 'src'));
    dest = pathModule.toNamespacedPath(getValidatedPath(dest, 'dest'));
    lazyLoadCp();
    cpFn(src, dest, options, callback);
}