import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {InputError} from "../../types";

export const getUnauthorized = (state: StateSchema): boolean => state.auth.data.unauthorized
export const getNotFound = (state: StateSchema): boolean => state.auth.data.notFound
export const getLoginErrors = (state: StateSchema): InputError | undefined => state.auth.data.loginErrors
export const getIsLogging = (state: StateSchema): boolean => state.auth.data.isLogging
export const getIsFetching = (state: StateSchema): boolean => state.auth.data.isFetching
export const getIsSendingOTP = (state: StateSchema): boolean => state.auth.data.isSendingOTP
export const getIsCheckingOtp = (state: StateSchema): boolean => state.auth.data.isCheckingOTP
export const getOtpErrors = (state: StateSchema): InputError | string | undefined => state.auth.data.otpErrors
export const getIsUpdatingProfile = (state: StateSchema): boolean => state.auth.data.isUpdatingProfile
export const getProfileErrors = (state: StateSchema): InputError | undefined => state.auth.data.profileErrors
export const getCSRFToken = (state: StateSchema): string => state.auth.data.csrfToken
export const getIsGoogleAuth = (state: StateSchema): boolean => state.auth.data.isGoogleAuth
export const getIsLoggingGoogle = (state: StateSchema): boolean => state.auth.data.isLoggingGoogle
export const getIsGettingIP = (state: StateSchema): boolean => state.auth.data.isGettingIP
export const getIsGettingCountry = (state: StateSchema): boolean => state.auth.data.isGettingCountry
export const getIsLogouting = (state: StateSchema): boolean => state.auth.data.isLogouting
