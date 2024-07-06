function lstatSync(path, options = { bigint: false, throwIfNoEntry: true }) {
    path = getValidatedPath(path);
    const stats = binding.lstat(
      pathModule.toNamespacedPath(path),
      options.bigint,
      undefined,
      options.throwIfNoEntry,
    );
    if (stats === undefined) { return; };
    return getStatsFromBinding(stats);
};