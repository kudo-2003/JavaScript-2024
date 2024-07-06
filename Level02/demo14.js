function readFile(path, options, callback) {
    callback ||= options;
    validateFunction(callback, 'cb');
    options = getOptions(options, { flag: 'r' });
    const ReadFileContext = require('internal/fs/read/context');
    const context = new ReadFileContext(callback, options.encoding);
    context.isUserFd = isFd(path); // File descriptor ownership
    if (options.signal) { context.signal = options.signal; };
    if (context.isUserFd) {
      process.nextTick(function tick(context) {
        ReflectApply(readFileAfterOpen, { context }, [null, path]);
      }, context);
      return;
    }
    if (checkAborted(options.signal, callback)) return;
    const flagsNumber = stringToFlags(options.flag, 'options.flag');
    path = getValidatedPath(path);
    const req = new FSReqCallback();
    req.context = context;
    req.oncomplete = readFileAfterOpen;
    binding.open(pathModule.toNamespacedPath(path),
                 flagsNumber, 0o666, req);
}