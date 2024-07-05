function chmodSync(path, mode) {
    path = getValidatedPath(path);
    mode = parseFileMode(mode, 'mode');
    binding.chmod( pathModule.toNamespacedPath(path), mode, );
}