function futimesSync(fd, atime, mtime) {
    binding.futimes( fd,
      toUnixTimestamp(atime, 'atime'),
      toUnixTimestamp(mtime, 'mtime'),
    );
}