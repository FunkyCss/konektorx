import { WooCommerceAPI } from '../api/woocommerce-api.js';

export class OrderService {
  constructor(url, consumerKey, consumerSecret) {
    this.api = new WooCommerceAPI(url, consumerKey, consumerSecret);
  }

  async loadOrders(page, perPage) {
    try {
      return await this.api.getOrders(page, perPage);
    } catch (error) {
      console.error('Failed to load orders:', error);
      throw error;
    }
  }

  async markOrderAsCompleted(orderId) {
    try {
      return await this.api.updateOrderStatus(orderId, 'completed');
    } catch (error) {
      console.error(`Failed to mark order ${orderId} as completed:`, error);
      throw error;
    }
  }
}