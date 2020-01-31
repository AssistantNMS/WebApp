import ReactGA from 'react-ga';

export const initAnalytics = () => {
    if (!window.config.googleAnalyticsEnabled) return;

    ReactGA.initialize('UA-145632237-3');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export const trackEvent = (analyticsEvent: string) => {
    if (!window.config.googleAnalyticsEnabled) return;

    ReactGA.event({
        category: analyticsEvent,
        action: analyticsEvent,
    });
}