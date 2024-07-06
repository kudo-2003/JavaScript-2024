function lutimesSync(path, atime, mtime) {
    path = getValidatedPath(path);
    binding.lutimes(
      pathModule.toNamespacedPath(path),
      toUnixTimestamp(atime),
      toUnixTimestamp(mtime),
    );
  }