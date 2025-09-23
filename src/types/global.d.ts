interface ServiceResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface ServiceErrorResponse<T> {
  status: number;
  message: string;
  optionalMessage?: string | null;
  data: T;
}

declare namespace Service {
  type Response<T = unknown> = ServiceResponse<T>;
  type ErrorResponse<T = null> = ServiceErrorResponse<T>;
}
