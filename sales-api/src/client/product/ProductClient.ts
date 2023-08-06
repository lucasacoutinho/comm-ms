import axios from "axios";
import { env } from "../../config/env";
import { Product } from "../../types/product";

const API_URL = `${env.SALES_PRODUCT_HOST}:${env.SALES_PRODUCT_PORT}`;

class ProductClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkProductStock(products: Product[], productRequestHeaders: any): Promise<boolean> {
    try {
      let response = true;

      const headers = {
        "Content-Type": "application/json",
        "X-TRANSACTION-ID": productRequestHeaders.X_TRANSACTION_ID as string,
        Authorization: productRequestHeaders.authorization as string
      };

      await axios
        .post(`http://${API_URL}/api/product/check-stock`, { products }, { headers })
        .then(() => {
          response = false;
        })
        .catch(() => {
          response = true;
        });

      return response;
    } catch (error) {
      return true;
    }
  }
}

export default new ProductClient();
