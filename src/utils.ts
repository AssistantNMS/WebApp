export const getJSON = (url: string, callback: any) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(true, xhr.response);
        } else {
            callback(false, xhr.response);
        }
    };
    xhr.send();
};

export const defaultConfig = {
    googleAnalyticsEnabled: false,
    consoleLogDebug: true,
    useServiceWorker: false,
    apiUrl: "https://api.nmsassistant.com",
}