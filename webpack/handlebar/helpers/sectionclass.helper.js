module.exports = function (conditional, options) {
    if ((conditional % 2) == 0) {
        return 'style1';
    } else {
        return 'alt style2';
    }
};