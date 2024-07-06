function fstatSync(fd, options = { bigint: false }) {
    const stats = binding.fstat(fd, options.bigint, undefined, false);
    if (stats === undefined) { return; }
    return getStatsFromBinding(stats);
}