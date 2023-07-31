export {};

declare global {
  namespace Express {
    export interface Request {
      auth?: number;
    }
  }
}
