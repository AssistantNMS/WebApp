// import { toast } from 'react-toastify';

// export const initUpdateNotification = (text: any) => {
//     window.addEventListener("newContentAvailable", () => {
//         toast.info(text, {
//             autoClose: false,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//         });
//     });
// }

export const updateServiceWorker = (registration: any) => {
    if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();

    /*if (!window.registration || !window.registration.waiting) return;

    window.registration.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();*/

    // const preventDevToolsReloadLoop = false;
    // navigator.serviceWorker.addEventListener("controllerchange", function () {
    //     // Ensure refresh is only called once.
    //     // This works around a bug in "force update on reload".
    //     if (preventDevToolsReloadLoop) return;
    //     preventDevToolsReloadLoop = true;
    //     window.location.reload();
    // });
    // navigator.serviceWorker.ready.then(registration => {
    //     registration.waiting &&
    //         registration.waiting.postMessage("skipWaiting");
    // })
}