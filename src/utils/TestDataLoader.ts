import users from '../testData/users.json';
import orders from '../testData/orders.json';

export class TestDataLoader {

    static getUsers() {
        return users;
    }

    static getOrders() {
        return orders;
    }

}