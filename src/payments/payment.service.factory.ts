import { Injectable } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { IPaymentService } from "./payment.service.interface";

@Injectable()
export class PaymentServiceFactory {
    createPaymentService(service: string): IPaymentService {
        if (service === 'Service1') {
            return new PaymentService();
        }
        // If in future will be some additional payment service, it can be added here
        throw new Error('Service not supported');
    }
}