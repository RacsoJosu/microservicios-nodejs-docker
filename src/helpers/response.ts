

export interface ApiResponse<T = null>{
  title: string,
  message: string,
  data?: T | null,
  success: boolean,
  statusCode:number,
}


export interface ApiError<T = null> {
   title: string,
  message: string,
  success: boolean,
  statusCode:number,
  data?:T | null;
}

export function successResponse<T>(params: Omit<ApiResponse<T>, "success">): ApiResponse<T> {
  return { ...params, statusCode: params.statusCode ?? 200, success:  true };
}

export function errorResponse<T>(params: ApiError<T>): ApiError<T> {
  return { ...params, statusCode: params.statusCode ?? 400, success:  false };
}

