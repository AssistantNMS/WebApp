import { itemNameUrlMapper } from './stringHelper';

// export const setDocumentTitle = (title: string) => {
//     document.title = getNewDocumentTitle(title);
// }

export const getNewDocumentTitle = (title: string) => `${title} - Assistant For No Man's Sky`;

export const toggleHtmlNodeClass = (selector: string, className: string): boolean => {
    const htmlTag = document.querySelector(selector);
    if (htmlTag != null) {
        htmlTag.classList.toggle(className);
    }
    return htmlTag?.classList?.contains?.(className) ?? false;
};

export const updateUrl = (id: string, title: string, selectedLanguage?: string) => {
    const urlTitle = itemNameUrlMapper(title);
    // const urlSuffix = (selectedLanguage != null)
    //     ? `${selectedLanguage}/${urlTitle}`
    //     : urlTitle
    const urlSuffix = urlTitle;
    window?.history?.pushState?.(
        null,
        getNewDocumentTitle(title),
        `/catalogue-item/${id}/${urlSuffix}`
    );
};

export const addScriptToHead = (id: string, url: string, onLoad?: () => void) => {
    const existingScript = document.getElementById(id);
    if (existingScript != null) {
        if (onLoad != null) {
            onLoad();
        }
        return;
    }

    try {
        const scriptNode = document.createElement('script');
        scriptNode.id = id;
        scriptNode.type = 'text/javascript';
        scriptNode.async = true;
        if (onLoad != null) {
            scriptNode.onload = onLoad;
        }

        scriptNode.src = url;
        document.head?.appendChild?.(scriptNode);
    }
    catch (err) {
        console.error(err);
    }
};

export const removeScriptFromHead = (id: string) => {
    const existingScript = document.getElementById(id);
    if (existingScript == null) {
        return;
    }

    try {
        existingScript.remove();
    }
    catch (err) {
        console.error(err);
    }
};