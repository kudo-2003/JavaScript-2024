class Dir {
    constructor(handle, path, options) {
      if (handle == null) throw new ERR_MISSING_ARGS('handle');
      this[kDirHandle] = handle;
      this[kDirBufferedEntries] = [];
      this[kDirPath] = path;
      this[kDirClosed] = false;
      this[kDirOperationQueue] = null;
      this[kDirOptions] = {
        bufferSize: 32,
        ...getOptions(options, { encoding: 'utf8', }),
      };
      validateUint32(this[kDirOptions].bufferSize, 'options.bufferSize', true);
      this[kDirReadPromisified] = FunctionPrototypeBind(
        internalUtil.promisify(this[kDirReadImpl]), this, false);
      this[kDirClosePromisified] = FunctionPrototypeBind(
        internalUtil.promisify(this.close), this);
    };
    get path() {return this[kDirPath]; };
    read(callback) { return this[kDirReadImpl](true, callback); };
    [kDirReadImpl](maybeSync, callback) {
      if (this[kDirClosed] === true) { throw new ERR_DIR_CLOSED(); };
      if (callback === undefined) { return this[kDirReadPromisified](); };
      validateFunction(callback, 'callback');
      if (this[kDirOperationQueue] !== null) {
        ArrayPrototypePush(this[kDirOperationQueue], () => { this[kDirReadImpl](maybeSync, callback); }); return; }
      if (this[kDirBufferedEntries].length > 0) {
        try {
          const dirent = ArrayPrototypeShift(this[kDirBufferedEntries]);
          if (this[kDirOptions].recursive && dirent.isDirectory()) {
            this.readSyncRecursive(dirent);};
          if (maybeSync) process.nextTick(callback, null, dirent);
          else callback(null, dirent);
          return;
        } catch (error) { return callback(error); }; };
      const req = new FSReqCallback();
      req.oncomplete = (err, result) => {
        process.nextTick(() => {
          const queue = this[kDirOperationQueue];
          this[kDirOperationQueue] = null;
          for (const op of queue) op(); });
        if (err || result === null) { return callback(err, result); }
        try {
          this.processReadResult(this[kDirPath], result);
          const dirent = ArrayPrototypeShift(this[kDirBufferedEntries]);
          if (this[kDirOptions].recursive && dirent.isDirectory()) {
            this.readSyncRecursive(dirent); };
          callback(null, dirent);
        } catch (error) { callback(error); };
      };
      this[kDirOperationQueue] = [];
      this[kDirHandle].read(
        this[kDirOptions].encoding,
        this[kDirOptions].bufferSize,
        req,
      );
    };
    processReadResult(path, result) {
      for (let i = 0; i < result.length; i += 2) {
        ArrayPrototypePush(
          this[kDirBufferedEntries],
          getDirent(
            path,
            result[i],
            result[i + 1],
          ),
        );
      };
    };
    readSyncRecursive(dirent) {
      const path = pathModule.join(dirent.parentPath, dirent.name);
      const ctx = { path };
      const handle = dirBinding.opendir(
        pathModule.toNamespacedPath(path),
        this[kDirOptions].encoding,
        undefined,
        ctx,
      );
      handleErrorFromBinding(ctx);
      const result = handle.read(
        this[kDirOptions].encoding,
        this[kDirOptions].bufferSize,
        undefined,
        ctx,
      );
      if (result) { this.processReadResult(path, result); };
      handle.close(undefined, ctx);
      handleErrorFromBinding(ctx);}
    readSync() {
      if (this[kDirClosed] === true) { throw new ERR_DIR_CLOSED(); };
      if (this[kDirOperationQueue] !== null) { throw new ERR_DIR_CONCURRENT_OPERATION();};
      if (this[kDirBufferedEntries].length > 0) {
        const dirent = ArrayPrototypeShift(this[kDirBufferedEntries]);
        if (this[kDirOptions].recursive && dirent.isDirectory()) { this.readSyncRecursive(dirent);};
        return dirent;
      };
      const ctx = { path: this[kDirPath] };
      const result = this[kDirHandle].read(
        this[kDirOptions].encoding,
        this[kDirOptions].bufferSize,
        undefined,
        ctx,
      );
      handleErrorFromBinding(ctx);
      if (result === null) { return result; };
      this.processReadResult(this[kDirPath], result);
      const dirent = ArrayPrototypeShift(this[kDirBufferedEntries]);
      if (this[kDirOptions].recursive && dirent.isDirectory()) { this.readSyncRecursive(dirent);}
      return dirent;
    };
    close(callback) {
      if (callback === undefined) {
        if (this[kDirClosed] === true) { return PromiseReject(new ERR_DIR_CLOSED()); };
        return this[kDirClosePromisified](); };
      validateFunction(callback, 'callback');
      if (this[kDirClosed] === true) { process.nextTick(callback, new ERR_DIR_CLOSED()); return; }
      if (this[kDirOperationQueue] !== null) {
        ArrayPrototypePush(this[kDirOperationQueue], () => { this.close(callback); });
        return; };
      this[kDirClosed] = true;
      const req = new FSReqCallback();
      req.oncomplete = callback;
      this[kDirHandle].close(req);};
    closeSync() {
      if (this[kDirClosed] === true) { throw new ERR_DIR_CLOSED(); };
      if (this[kDirOperationQueue] !== null) { throw new ERR_DIR_CONCURRENT_OPERATION(); };
      this[kDirClosed] = true;
      const ctx = { path: this[kDirPath] };
      const result = this[kDirHandle].close(undefined, ctx);
      handleErrorFromBinding(ctx); return result; };
    async* entries() {
      try {
        while (true) {
          const result = await this[kDirReadPromisified]();
          if (result === null) { break;};
          yield result;
        };
      } finally { await this[kDirClosePromisified](); };
};
};