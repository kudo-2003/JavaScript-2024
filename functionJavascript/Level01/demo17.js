function createWriteStream(path, options) {
    lazyLoadStreams();
    return new WriteStream(path, options);
}