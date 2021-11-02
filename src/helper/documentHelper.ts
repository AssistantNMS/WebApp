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

export const updateUrl = (id: string, title: string) => {
    window?.history?.replaceState?.(
        null,
        getNewDocumentTitle(title),
        `/catalogue-item/${id}/${title.replace(/\s/g, '-')}`
    );
};