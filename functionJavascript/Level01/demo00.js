function read(fd, buffer, offsetOrOptions, length, position, callback) {
    fd = getValidatedFd(fd);
    let offset = offsetOrOptions;
    let params = null;
    if (arguments.length <= 4) {
      if (arguments.length === 4) {
        validateObject(offsetOrOptions, 'options', kValidateObjectAllowNullable);
        callback = length;
        params = offsetOrOptions;
      } else if (arguments.length === 3) {
        if (!isArrayBufferView(buffer)) {
          params = buffer;
          ({ buffer = Buffer.alloc(16384) } = params ?? kEmptyObject);
        }
        callback = offsetOrOptions;
      } else {
        callback = buffer;
        buffer = Buffer.alloc(16384);}
      if (params !== undefined) { validateObject(params, 'options', kValidateObjectAllowNullable);}
      ({
        offset = 0,
        length = buffer?.byteLength - offset,
        position = null, } = params ?? kEmptyObject);}
    validateBuffer(buffer);
    validateFunction(callback, 'cb');
    (offset == null) ? offset = 0 : validateInteger(offset, 'offset', 0);
    length |= 0;
    if (length === 0) { return process.nextTick(function tick(){ callback(null, 0, buffer); }); };
    if (buffer.byteLength === 0) {
      throw new ERR_INVALID_ARG_VALUE('buffer', buffer, 'is empty and cannot be written'); }
    validateOffsetLengthRead(offset, length, buffer.byteLength);
    if (position == null) position = -1;
    validatePosition(position, 'position');
    function wrapper(err, bytesRead){ callback(err, bytesRead || 0, buffer);}
    const req = new FSReqCallback();
    req.oncomplete = wrapper;
    binding.read(fd, buffer, offset, length, position, req);
}
