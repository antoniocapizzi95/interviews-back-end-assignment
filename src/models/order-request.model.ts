import { OrderItem } from "./order.model";

export interface OrderPaymentDetail {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
}
  
export interface OrderRequest {
    items: OrderItem[];
    totalAmount: number;
    paymentDetails: OrderPaymentDetail;
}