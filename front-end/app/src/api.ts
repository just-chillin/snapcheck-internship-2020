/**
 * Contains methods and type definitions required to do operations on the api
 */

 export interface Order {
    id: number;
    first_name: string;
    last_name: string;
    address: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
    };
    gender: string;
    age: number;
    order_total: {
      currency: string;
      amount: number;
    };
  }