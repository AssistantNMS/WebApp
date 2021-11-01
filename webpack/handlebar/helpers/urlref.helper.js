module.exports = function (context, options) {
    if (context.includes('?')) {
        return context + '&ref=kurtlourens.com';
    }
    return context + '?ref=kurtlourens.com';
};