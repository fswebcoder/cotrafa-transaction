export interface IGeneralResponse<T> {
    success: boolean;
    message: string;
    data:    T;
}
