function mkdirSync(path, options) {
    let mode = 0o777;
    let recursive = false;
    if (typeof options === 'number' || typeof options === 'string') {
      mode = options;
    } else if (options) {
      if (options.recursive !== undefined)
        recursive = options.recursive;
      if (options.mode !== undefined)
        mode = options.mode;
    }
    path = getValidatedPath(path);
    validateBoolean(recursive, 'options.recursive');
    const result = binding.mkdir(
      pathModule.toNamespacedPath(path),
      parseFileMode(mode, 'mode'),
      recursive,
    );
    if (recursive) { return result; };
};