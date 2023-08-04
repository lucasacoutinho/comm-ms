import axios from "axios";
import { env } from "../../config/env";
import { Product } from "../../types/product";

const API_URL = `${env.SALES_PRODUCT_HOST}:${env.SALES_PRODUCT_PORT}`;

class ProductClient {
  async checkProductStock(products: Product[], token: string): Promise<boolean> {
    try {
      let response = true;

      const headers = {
        Authorization: token
      };

      await axios
        .post(`${API_URL}/api/product/check-stock`, { products: products }, { headers })
        .then(() => {
          response = false;
        })
        .catch((res) => {
          response = true;
        });

      return response;
    } catch (error) {
      return true;
    }
  }
}

export default new ProductClient();
