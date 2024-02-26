import { Order } from "../../models/order.model";
import { IOrderRepository } from "../order.repository.interface";

export class OrderRepository implements IOrderRepository {
    private orders: Order[];

    constructor() {
        this.orders = [];
    }
    
    async addOrder(order: Order): Promise<number> {
        order.id = this.generateId();
        this.orders.push(order);
        return order.id;
    }

    private generateId(): number {
        return this.orders.length + 1;
    }
    
}