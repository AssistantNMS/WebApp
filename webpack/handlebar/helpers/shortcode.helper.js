function calculateYearsOfWork() {
    const now = Date.now();
    const startedWorkInMilli = new Date('2017-01-01');
    const nowInMilli = new Date(now);
    const differenceInMilli = (nowInMilli - startedWorkInMilli);
    const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;

    let result = Math.floor(differenceInMilli / millisecondsPerYear).toFixed(0);
    const monthsInYears = (differenceInMilli / millisecondsPerYear) % 1;
    if (monthsInYears > 7.5) result = +result + 1;
    else if (monthsInYears > 0.1) result += '+';
    result += ' years';
    return result;
}

module.exports = function (context, options) {
    const shortCodeMap = {
        '[entelect]': '<a href="http://www.entelect.co.za?ref=kurtlourens.com" class="color-entelect" target="_blank" rel="noopener" title="Entelect" alt="Entelect">Entelect</a>',
        '[redRubyIt]': '<a href="http://redrubyit.co.za?ref=kurtlourens.com" class="color-ruby" target="_blank" rel="noopener" title="Red Ruby IT" alt="Red Ruby IT">Red Ruby IT</a>',
        '[flutter]': '<a href="https://flutter.dev/?ref=kurtlourens.com" class="color-flutter" target="_blank" rel="noopener" title="Flutter" alt="Flutter">Flutter</a>',
        '[workDuration]': calculateYearsOfWork(),
        '[blog]': '<a href="https://blog.kurtlourens.com?ref=kurtlourens.com" target="_blank" rel="noopener noreferrer" title="Kurt\'s blog">blog</a>',
        '[blogCvArticle]': '<a href="https://blog.kurtlourens.com/kurtlourens-com-redesigned/?ref=kurtlourens.com" target="_blank" rel="noopener noreferrer" title="Kurt\'s blog">click here to read it</a>',
    };

    let innerHTML = context;
    for (const shortCodeMapProp in shortCodeMap) {
        const rex = new RegExp(`\\${shortCodeMapProp}`, 'g');
        innerHTML = innerHTML.replace(rex, shortCodeMap[shortCodeMapProp]);
    }
    return innerHTML;
};