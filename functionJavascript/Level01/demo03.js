function appendFileSync(path, data, options) {
    options = getOptions(options, { encoding: 'utf8', mode: 0o666, flag: 'a' });
    options = copyObject(options);
    if (!options.flag || isFd(path)) options.flag = 'a';
    fs.writeFileSync(path, data, options);
}