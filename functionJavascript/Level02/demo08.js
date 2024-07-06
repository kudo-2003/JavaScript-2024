function openAsBlob(path, options = kEmptyObject) {
    validateObject(options, 'options');
    const type = options.type || '';
    validateString(type, 'options.type');
    path = getValidatedPath(path);
    return PromiseResolve(createBlobFromFilePath(pathModule.toNamespacedPath(path), { type }));
}