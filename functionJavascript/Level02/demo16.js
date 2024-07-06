function write(fd, buffer, offsetOrOptions, length, position, callback) {
    function wrapper(err, written) { callback(err, written || 0, buffer); }
    fd = getValidatedFd(fd);
    let offset = offsetOrOptions;
    if (isArrayBufferView(buffer)) {
      callback ||= position || length || offset;
      validateFunction(callback, 'cb');
      if (typeof offset === 'object') {
        ({
          offset = 0,
          length = buffer.byteLength - offset,
          position = null,
        } = offsetOrOptions ?? kEmptyObject);
      };
      if (offset == null || typeof offset === 'function') { offset = 0;
      } else { validateInteger(offset, 'offset', 0); };
      if (typeof length !== 'number') length = buffer.byteLength - offset;
      if (typeof position !== 'number') position = null;
      validateOffsetLengthWrite(offset, length, buffer.byteLength);
      const req = new FSReqCallback();
      req.oncomplete = wrapper;
      binding.writeBuffer(fd, buffer, offset, length, position, req);
      return;
    }
    validateStringAfterArrayBufferView(buffer, 'buffer');
    if (typeof position !== 'function') {
      if (typeof offset === 'function') { position = offset; offset = null;
      } else { position = length; };
      length = 'utf8';
    }
    const str = buffer;
    validateEncoding(str, length);
    callback = position;
    validateFunction(callback, 'cb');
    const req = new FSReqCallback();
    req.oncomplete = wrapper;
    binding.writeString(fd, str, offset, length, req);
}