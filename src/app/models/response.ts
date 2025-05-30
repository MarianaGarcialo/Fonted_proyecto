export class Response<T> {
    status: number;
    message: string;
    data: T
    constructor(status: number = 0,
        message: string = "", data: T
    ) {
        this.status = status;
        this.message = message;
        this.data = data
    }
}