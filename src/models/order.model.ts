export interface OrderItem {
    productId: number;
    quantity: number;
}

export interface Order {
    items: OrderItem[];
    totalAmount: number;
}