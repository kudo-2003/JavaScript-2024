function mkdtempSync(prefix, options) {
    options = getOptions(options);
    prefix = getValidatedPath(prefix, 'prefix');
    warnOnNonPortableTemplate(prefix);
    return binding.mkdtemp(prefix, options.encoding);
}