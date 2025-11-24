export const UPDATE_MODE_DEFAULT = 'default';
export const UPDATE_MODE_CHANGE_PASSWORD = 'change password';
export const UPDATE_MODE_EDIT_PROFILE = 'edit profile.';

export const base_url = "https://webaccounting.herokuapp.com";

export const createToken = (userName: string, password: string) => (
    `Basic ${btoa(`${userName}:${password}`)}`
)