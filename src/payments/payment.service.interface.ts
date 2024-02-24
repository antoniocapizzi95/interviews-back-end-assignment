import { PaymentRequest } from "../models/payment-request.model";
import { PaymentResponse } from "../models/payment-response.model";

export interface IPaymentService {
    processPayment(paymentDetails: PaymentRequest): Promise<PaymentResponse>
}