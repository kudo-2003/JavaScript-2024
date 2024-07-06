function writeSync(fd, buffer, offsetOrOptions, length, position) {
    fd = getValidatedFd(fd);
    const ctx = {};
    let result;
    let offset = offsetOrOptions;
    if (isArrayBufferView(buffer)) {
      if (typeof offset === 'object') {
        ({
          offset = 0,
          length = buffer.byteLength - offset,
          position = null,
        } = offsetOrOptions ?? kEmptyObject);
      }
      if (position === undefined) position = null;
      if (offset == null) { offset = 0;
      } else { validateInteger(offset, 'offset', 0); };
      if (typeof length !== 'number') length = buffer.byteLength - offset;
      validateOffsetLengthWrite(offset, length, buffer.byteLength);
      result = binding.writeBuffer(fd, buffer, offset, length, position, undefined, ctx);
    } else {
      validateStringAfterArrayBufferView(buffer, 'buffer');
      validateEncoding(buffer, length);
      if (offset === undefined) offset = null;
      result = binding.writeString(fd, buffer, offset, length, undefined, ctx);
    }
    handleErrorFromBinding(ctx);
    return result;
}