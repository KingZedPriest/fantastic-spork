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

declare type ApiResponse<T = IGenericObject> = {
    status: number;
    success: boolean;
    message: string;
    data?: ResponseData<T>;
}
