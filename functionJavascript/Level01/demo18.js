function exists(path, callback) {
    validateFunction(callback, 'cb');
    function suppressedCallback(err) { callback(err ? false : true); };
    try { fs.access(path, F_OK, suppressedCallback); } catch { return callback(false);}
}