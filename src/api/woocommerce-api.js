export class WooCommerceAPI {
  constructor(url, consumerKey, consumerSecret) {
    this.baseUrl = `${url}/wp-json/wc/v3`;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  async getOrders(page = 1, perPage = 10, status = '') {
    const url = new URL(`${this.baseUrl}/orders`);
    url.searchParams.append('consumer_key', this.consumerKey);
    url.searchParams.append('consumer_secret', this.consumerSecret);
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);
    if (status) {
      url.searchParams.append('status', status);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId, status) {
    const url = new URL(`${this.baseUrl}/orders/${orderId}`);
    url.searchParams.append('consumer_key', this.consumerKey);
    url.searchParams.append('consumer_secret', this.consumerSecret);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  }
}