function createReadStream(path, options) {
    lazyLoadStreams();
    return new ReadStream(path, options);
}