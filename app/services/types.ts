export interface OtpConfirmationRequest {
    phone: string;
  }
  
  export interface OtpConfirmationResponse {
    status: number;
    data: any; 
  }