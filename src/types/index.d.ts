//For the Response
declare type IGenericObject = {
    [key: string]: any;
}

declare type PaginatedData<T> = {
    total: number;
    page: number;
    pageSize: number;
    results: T[];
}

declare type ResponseData<T> = T | PaginatedData<T>;

declare type ApiResponse<T = any> = {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}

//User
declare type User = {
    email: string;
    name: string | null;
    id: number;
}