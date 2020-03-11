

export const applyIsDarkToBody = (isDark: boolean) => {
    const bodyTag = document.querySelector('body');
    if (bodyTag != null) {
        if (isDark) {
            bodyTag.classList.add('isDark');
        } else {
            bodyTag.classList.remove('isDark');
        }
    }
}