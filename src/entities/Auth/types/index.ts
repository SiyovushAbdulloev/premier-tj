export interface InputError {
    [key: string]: Array<string>
}

export interface Captcha {
    captcha: string
    captcha_key: string
}

export interface Auth {
    unauthorized: boolean
    notFound: boolean
    csrfToken: string
    loginErrors: InputError | undefined
    isLogging: boolean
    isFetching: boolean
    isSendingOTP: boolean
    isCheckingOTP: boolean
    otpErrors: InputError | string | undefined
    isUpdatingProfile: boolean
    profileErrors: InputError | undefined
    isGoogleAuth: boolean
    isLoggingGoogle: boolean
    isGettingIP: boolean
    isGettingCountry: boolean
    isLogouting: boolean
    captcha?: Captcha
    isGettingCaptcha: boolean
}

export interface AuthSchema {
    data: Auth
}
