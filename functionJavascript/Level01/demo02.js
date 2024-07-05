function appendFile(path, data, options, callback) {
    callback ||= options;
    validateFunction(callback, 'cb');
    options = getOptions(options, { encoding: 'utf8', mode: 0o666, flag: 'a' });
    options = copyObject(options);
    if (!options.flag || isFd(path)) options.flag = 'a';
    fs.writeFile(path, data, options, callback);
}