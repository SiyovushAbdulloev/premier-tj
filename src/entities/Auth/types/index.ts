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
}

export interface AuthSchema {
    data: Auth
}
