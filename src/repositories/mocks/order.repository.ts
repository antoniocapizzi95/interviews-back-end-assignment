import { Order } from "src/models/order.model";
import { IOrderRepository } from "../order.repository.interface";

export class OrderRepository implements IOrderRepository {
    private orders: Order[];

    constructor() {
        this.orders = [];
    }
    
    addOrder(order: Order) {
        this.orders.push(order);
    }
    
}