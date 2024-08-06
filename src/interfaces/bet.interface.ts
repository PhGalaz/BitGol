import { ObjectId } from "mongoose";
export interface IBetCreationRequest {
    fixture_id: number;
    home: number;
    draw: number;
    away: number;

    user_id: number | null;
    status: number;
    createdAt: string;
  }
  
  export interface IBet extends IBetCreationRequest {
    id: number;
    open_amount: number;
    funding_address: string;
    taking_address: string;
  }
  
  declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
      // eslint-disable-next-line no-unused-vars
      interface Request {
      }
    }
  }