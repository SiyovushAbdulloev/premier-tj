export interface InputError {
    [key: string]: Array<string>
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
    otpErrors: InputError | undefined
    isUpdatingProfile: boolean
    profileErrors: InputError | undefined
}

export interface AuthSchema {
    data: Auth
}
