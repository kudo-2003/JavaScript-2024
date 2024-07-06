function fchownSync(fd, uid, gid) {
    validateInteger(uid, 'uid', -1, kMaxUserId);
    validateInteger(gid, 'gid', -1, kMaxUserId);
    binding.fchown(fd, uid, gid);
}