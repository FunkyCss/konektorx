import { WooCommerceAPI } from '../api/woocommerce-api.js';

export class OrderService {
  constructor(siteUrl, consumerKey, consumerSecret) {
    this.api = new WooCommerceAPI(siteUrl, consumerKey, consumerSecret);
  }

  async loadOrders(page = 1, perPage = 10) {
    try {
      const response = await this.api.getOrders(page, perPage);
      // Filter processing orders on the client side
      return response.filter(order => order.status === 'processing');
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async markOrderAsCompleted(orderId) {
    try {
      const response = await this.api.updateOrderStatus(orderId, 'completed');
      return response;
    } catch (error) {
      console.error(`Failed to mark order ${orderId} as completed:`, error);
      throw error;
    }
  }
}