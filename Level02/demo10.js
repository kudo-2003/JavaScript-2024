function readdirSync(path, options) {
    options = getOptions(options);
    path = getValidatedPath(path);
    if (options.recursive != null) { validateBoolean(options.recursive, 'options.recursive'); };
    if (options.recursive) { return readdirSyncRecursive(path, options); };
    const result = binding.readdir(
      pathModule.toNamespacedPath(path),
      options.encoding,
      !!options.withFileTypes,
    );
    return result !== undefined && options.withFileTypes ? getDirents(path, result) : result;
}