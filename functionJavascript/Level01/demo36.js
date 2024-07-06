function link(existingPath, newPath, callback) {
    callback = makeCallback(callback);
    existingPath = getValidatedPath(existingPath, 'existingPath');
    newPath = getValidatedPath(newPath, 'newPath');
    const req = new FSReqCallback();
    req.oncomplete = callback;
    binding.link(pathModule.toNamespacedPath(existingPath),
                 pathModule.toNamespacedPath(newPath), req);
};