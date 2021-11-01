module.exports = function (context, options) {
    return (new Date()).toISOString().split('T')[0]
};