import { IPaymentService } from "./payment.service.interface";
import { PaymentRequest } from "../models/payment-request.model";
import { PaymentResponse } from "../models/payment-response.model";
import axios, { AxiosResponse } from 'axios';

export class PaymentService implements IPaymentService {

    private readonly url: string;
    
    constructor() {
        this.url = 'https://paymentservice.example.com/api/payment';
    }

    async processPayment(paymentDetails: PaymentRequest): Promise<PaymentResponse> {
        try {
            const response = await axios.post<PaymentRequest, AxiosResponse<PaymentResponse>>(
                this.url,
                { paymentRequest: paymentDetails }
            );
            return {
                transactionId: response.data.transactionId,
                status: response.data.status
            };
        } catch (error) {
            console.log(error.message);
            return {
                transactionId: null,
                status: 'error'
            }
        }
    }
}