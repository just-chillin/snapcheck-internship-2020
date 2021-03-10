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

// Since this is a mock api, we just use localhost here.
// If this were a real api, I'd store the api url in the environment variables
// so its easy for the developer to change.
const PEOPLE_URL="http://localhost:3001/people";

/**
 * Calls the backend api, asking it for all the orders it has.
 * @returns Order[] All the orders in the database.
 */
export async function ordersGET(): Promise<Order[]> {
  const result = await fetch(PEOPLE_URL);
  return await result.json();
}

/**
 * PUTs an order into the database.
 */
export async function orderPUT(order: Order) {
    return await fetch(PEOPLE_URL, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
