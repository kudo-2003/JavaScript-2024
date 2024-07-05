function existsSync(path) {
    try {path = getValidatedPath(path); } catch { return false; }
    return binding.existsSync(pathModule.toNamespacedPath(path));
}