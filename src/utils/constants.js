
export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export const campaignStatusEnum = {
    init: 'init',
}

export const locationEnum = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
}