function ftruncateSync(fd, len = 0) {
    validateInteger(len, 'len');
    len = MathMax(0, len);
    binding.ftruncate(fd, len);
}