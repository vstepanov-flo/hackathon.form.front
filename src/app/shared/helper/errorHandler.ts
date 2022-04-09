import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorHandlerResponse {
  title: string;
  body: string;
}

export function errorHandler(err: HttpErrorResponse): ErrorHandlerResponse {
  const { error, status, message } = err;
  const errorStatus = status || error?.status;
  const errorMessage = error?.message || message;

  const response: ErrorHandlerResponse = {
    title: `Код ошибки: ${errorStatus}`,
    body: '',
  };

  switch (errorStatus) {
    case 0:
      response.body = 'CORS ошибка, обратитесь к Администратору';
      break;
    case 401:
      response.body = 'Ошибка автоизации. Код не совпадает';
      break;
    case 429:
      response.body = 'Лимит запросов на сервер превышен';
      break;
    default:
      response.body = errorMessage;
      break;
  }

  return response;
}
