export const getJSON = (url: string, callback: any) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        const status = xhr.status;
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
    isRunningInOverwolf: false,
    apiUrl: "https://api.nmsassistant.com",
    assistantAppsUrl: "https://api.assistantapps.com",
    assistantAppsAppGuid: "589405b4-e40f-4cd9-b793-6bf37944ee09",
}