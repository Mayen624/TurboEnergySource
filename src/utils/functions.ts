

export function getURLParams(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('message');
}