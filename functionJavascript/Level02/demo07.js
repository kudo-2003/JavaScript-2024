function openSync(path, flags, mode) {
    path = getValidatedPath(path);
    return binding.open(
      pathModule.toNamespacedPath(path),
      stringToFlags(flags),
      parseFileMode(mode, 'mode', 0o666),
    );
};