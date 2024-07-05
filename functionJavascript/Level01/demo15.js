function cpSync(src, dest, options) {
    options = validateCpOptions(options);
    src = pathModule.toNamespacedPath(getValidatedPath(src, 'src'));
    dest = pathModule.toNamespacedPath(getValidatedPath(dest, 'dest'));
    lazyLoadCp();
    cpSyncFn(src, dest, options);
}