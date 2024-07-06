function lchownSync(path, uid, gid) {
    path = getValidatedPath(path);
    validateInteger(uid, 'uid', -1, kMaxUserId);
    validateInteger(gid, 'gid', -1, kMaxUserId);
    binding.lchown(
      pathModule.toNamespacedPath(path),
      uid, gid,
    );
}
  