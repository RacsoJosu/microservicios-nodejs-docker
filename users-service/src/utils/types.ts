export interface ErrorLog {
  message: string;               // mensaje del error
  name: string;                  // tipo de error (StructError, TypeError, etc.)
  route: string;                 // ruta de la request
  method: string;                // método HTTP
  stack?: string;                // stack trace opcional
  cause?: unknown;               // causa opcional, puede ser cualquier cosa
  timestamp: string;             // fecha/hora en formato ISO o dayjs
}
