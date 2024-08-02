export interface IBetCreationRequest {
    home: number;
    draw: number;
    away: number;

    user_id: number | null;
    status: number;
    createdAt: string;
    funding_address: string;
  }

  export interface IBet extends IBetCreationRequest {
    id: number;
    open_amount: number;
  }
  
  declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
      // eslint-disable-next-line no-unused-vars
      interface Request {
      }
    }
  }