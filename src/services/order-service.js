import { WooCommerceAPI } from '../api/woocommerce-api.js';

export class OrderService {
  constructor(siteUrl, consumerKey, consumerSecret) {
    this.api = new WooCommerceAPI(siteUrl, consumerKey, consumerSecret);
  }

  async loadOrders(page = 1, perPage = 10) {
    try {
      const response = await this.api.getOrders({
        page: page,
        per_page: perPage,
        status: 'processing'
      });
      return response.filter(order => order.status === 'processing');
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error(`Failed to load orders: ${error.message}`);
    }
  }

  async markOrderAsCompleted(orderId) {
    try {
      const response = await this.api.updateOrderStatus(orderId, 'completed');
      if (response && response.status === 'completed') {
        return response;
      } else {
        throw new Error('Order status update failed');
      }
    } catch (error) {
      console.error(`Failed to mark order ${orderId} as completed:`, error);
      throw new Error(`Failed to mark order as completed: ${error.message}`);
    }
  }
}