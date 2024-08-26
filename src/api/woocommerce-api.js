export class WooCommerceAPI {
  constructor(url, consumerKey, consumerSecret) {
    this.baseUrl = `${url}/wp-json/wc/v3`;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  async getOrders(params = {}) {
    const url = new URL(`${this.baseUrl}/orders`);
    url.searchParams.append('consumer_key', this.consumerKey);
    url.searchParams.append('consumer_secret', this.consumerSecret);
    
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
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
        body: JSON.stringify({ status: status }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  }
}