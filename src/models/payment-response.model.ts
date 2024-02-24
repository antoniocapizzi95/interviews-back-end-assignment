export interface PaymentResponse {
    transactionId: string;
    status: 'approved' | 'declined' | 'error';
}