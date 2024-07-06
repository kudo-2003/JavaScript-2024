function readSync(fd, buffer, offsetOrOptions, length, position) {
    fd = getValidatedFd(fd);
    validateBuffer(buffer);
    let offset = offsetOrOptions;
    if (arguments.length <= 3 || typeof offsetOrOptions === 'object') {
      if (offsetOrOptions !== undefined) {
        validateObject(offsetOrOptions, 'options', kValidateObjectAllowNullable);
      }
      ({
        offset = 0,
        length = buffer.byteLength - offset,
        position = null,
      } = offsetOrOptions ?? kEmptyObject);
    }
    if (offset === undefined) { offset = 0;
    } else { validateInteger(offset, 'offset', 0); };
    length |= 0;
    if (length === 0) { return 0; };
    if (buffer.byteLength === 0) {
      throw new ERR_INVALID_ARG_VALUE('buffer', buffer, 'is empty and cannot be written');
    }
    validateOffsetLengthRead(offset, length, buffer.byteLength);
    if (position == null) position = -1;
    validatePosition(position, 'position');
    return binding.read(fd, buffer, offset, length, position);
}