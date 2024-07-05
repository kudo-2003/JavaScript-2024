function copyFileSync(src, dest, mode) {
    src = getValidatedPath(src, 'src');
    dest = getValidatedPath(dest, 'dest');
    binding.copyFile(
      pathModule.toNamespacedPath(src),
      pathModule.toNamespacedPath(dest),
      mode,
    );
}