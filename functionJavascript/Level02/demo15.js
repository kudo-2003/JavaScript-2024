function readFileSync(path, options) {
    options = getOptions(options, { flag: 'r' });
    if (options.encoding === 'utf8' || options.encoding === 'utf-8') {
      if (!isInt32(path)) { path = pathModule.toNamespacedPath(getValidatedPath(path)); };
      return binding.readFileUtf8(path, stringToFlags(options.flag));
    }
    const isUserFd = isFd(path); 
    const fd = isUserFd ? path : fs.openSync(path, options.flag, 0o666);
    const stats = tryStatSync(fd, isUserFd);
    const size = isFileType(stats, S_IFREG) ? stats[8] : 0;
    let pos = 0;
    let buffer; 
    let buffers; 
    if (size === 0) { buffers = [];
    } else { buffer = tryCreateBuffer(size, fd, isUserFd); };
    let bytesRead;
    if (size !== 0) {
      do {
        bytesRead = tryReadSync(fd, isUserFd, buffer, pos, size - pos);
        pos += bytesRead;
      } while (bytesRead !== 0 && pos < size);
    } else {
      do {
        buffer = Buffer.allocUnsafe(8192);
        bytesRead = tryReadSync(fd, isUserFd, buffer, 0, 8192);
        if (bytesRead !== 0) { ArrayPrototypePush(buffers, buffer.slice(0, bytesRead)); }
        pos += bytesRead;
      } while (bytesRead !== 0);
    }
    if (!isUserFd) fs.closeSync(fd);
    if (size === 0) { buffer = Buffer.concat(buffers, pos);
    } else if (pos < size) { buffer = buffer.slice(0, pos); };
    if (options.encoding) buffer = buffer.toString(options.encoding);
    return buffer;
}