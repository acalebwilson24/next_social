export type Error = {
    message: string
}

export type Response<T> = {
    data?: T;
    error?: Error;
}
