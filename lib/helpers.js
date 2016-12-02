const removeScripts = (text) => {
    return text.replace(/&lt;script\b[^<]*(?:(?!<\/script>)<[^<]*)*&lt;\/script&gt;/gi, '');
};

export {
    removeScripts,
}
