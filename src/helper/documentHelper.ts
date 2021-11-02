// export const setDocumentTitle = (title: string) => {
//     document.title = getNewDocumentTitle(title);
// }

export const getNewDocumentTitle = (title: string) => `${title} - Assistant For No Man's Sky`;

export const updateUrl = (title: string) => {
    window?.history?.replaceState?.(
        null,
        getNewDocumentTitle(title),
        `/catalogue-item/raw42/${title.replace(/\s/g, '-')}`
    );
};