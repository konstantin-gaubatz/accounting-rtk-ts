import {type UPDATE_MODE_CHANGE_PASSWORD, UPDATE_MODE_DEFAULT, UPDATE_MODE_EDIT_PROFILE} from "./constants.ts";

export type UpdateMode = typeof UPDATE_MODE_CHANGE_PASSWORD | typeof UPDATE_MODE_EDIT_PROFILE | typeof UPDATE_MODE_DEFAULT;

export interface UserData {
    login: string;
    firstName: string;
    lastName: string;
}

export interface UserProfile extends UserData {
    roles: string[];
}

export interface UserRegister extends UserData {
    password: string;
}