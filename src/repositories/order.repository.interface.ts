import { Order } from "../models/order.model";

export interface IOrderRepository {
    addOrder(order: Order): Promise<number>;
    getOrders(): Promise<Order[]>;
}