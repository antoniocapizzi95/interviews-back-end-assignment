export interface OrderResponse {
    success: boolean,
    message: string,
    orderId?: number,
    transactionId?: string
}