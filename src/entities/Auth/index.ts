import {
    getUnauthorized,
    getNotFound,
    getLoginErrors,
    getIsLogging,
    getIsFetching,
    getIsSendingOTP,
    getOtpErrors,
    getIsCheckingOtp,
    getIsUpdatingProfile,
    getProfileErrors,
    getCSRFToken,
    getIsGoogleAuth,
    getIsLoggingGoogle,
} from "./model/selectors";
import {authActions, authReducer} from "./model/slice";
import {Auth, AuthSchema, InputError} from "./types";
import {getCsrfToken} from "./model/services/getCsrfToken";
import {loginAdmin} from "./model/services/loginAdmin";
import {getAuthUser} from "./model/services/getAuthUser";
import {logoutAdmin} from "./model/services/logoutAdmin";
import {sendLoginOtp} from "./model/services/sendLoginOtp";
import {sendRegisterOtp} from "./model/services/sendRegisterOtp";
import {checkLoginOTP} from "./model/services/checkLoginOTP";
import {logoutUser} from "./model/services/logoutUser";
import {updateProfile} from "./model/services/updateProfile";
import {google} from "./model/services/google";
import {googleAuth} from "./model/services/googleAuth";

export {
    getUnauthorized,
    getNotFound,
    authReducer,
    authActions,
    getCsrfToken,
    loginAdmin,
    getLoginErrors,
    getIsLogging,
    getIsFetching,
    getAuthUser,
    logoutAdmin,
    sendLoginOtp,
    sendRegisterOtp,
    getIsSendingOTP,
    getIsCheckingOtp,
    getOtpErrors,
    checkLoginOTP,
    logoutUser,
    getProfileErrors,
    getIsUpdatingProfile,
    updateProfile,
    getCSRFToken,
    getIsGoogleAuth,
    google,
    getIsLoggingGoogle,
    googleAuth
}
export type {Auth, AuthSchema, InputError}
