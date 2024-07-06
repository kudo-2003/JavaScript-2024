function linkSync(existingPath, newPath) {
    existingPath = getValidatedPath(existingPath, 'existingPath');
    newPath = getValidatedPath(newPath, 'newPath');
    binding.link(
      pathModule.toNamespacedPath(existingPath),
      pathModule.toNamespacedPath(newPath),
    );
};