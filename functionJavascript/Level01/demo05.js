function accessSync(path, mode) {
    path = getValidatedPath(path);
    binding.access(pathModule.toNamespacedPath(path), mode);
}