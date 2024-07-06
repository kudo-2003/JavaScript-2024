class Dirent {
    constructor(name, type, path) {
      this.name = name;
      this.parentPath = path;
      this.path = path;
      this[kType] = type;
    }
    isDirectory() { return this[kType] === UV_DIRENT_DIR; };
    isFile() { return this[kType] === UV_DIRENT_FILE; };
    isBlockDevice() { return this[kType] === UV_DIRENT_BLOCK; };
    isCharacterDevice() { return this[kType] === UV_DIRENT_CHAR; };
    isSymbolicLink() { return this[kType] === UV_DIRENT_LINK; };
    isFIFO() { return this[kType] === UV_DIRENT_FIFO; }
    isSocket() { return this[kType] === UV_DIRENT_SOCKET; };
}