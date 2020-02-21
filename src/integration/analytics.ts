import ReactGA from 'react-ga';

export const initAnalytics = () => {
    if (!window.config.googleAnalyticsEnabled) return;

    ReactGA.initialize('UA-145632237-3');
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (window.config.consoleLogDebug) console.log('Initialized Analytics');
}

export const trackEvent = (analyticsEvent: string) => {
    if (!window.config.googleAnalyticsEnabled) return;

    const event = {
        category: analyticsEvent,
        action: analyticsEvent,
    };
    ReactGA.event(event);

    if (window.config.consoleLogDebug) console.log('trackEvent', event);
}

export const trackPageView = (url: string) => {
    if (!window.config.googleAnalyticsEnabled) return;

    ReactGA.pageview(url);

    if (window.config.consoleLogDebug) console.log('trackPageView', url);
}