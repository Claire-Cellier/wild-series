import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // The C of CRUD - Create operation

  async create(item: Omit<Item, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into item (title, user_id) values (?, ?)",
      [item.title, item.user_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Item;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // Return the array of items
    return rows as Item[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(item: Item) {
    // Execute the SQL UPDATE query to modify an existing item
    const [result] = await databaseClient.query<Result>(
      "update item set title = ?, user_id = ? where id = ?",
      [item.title, item.user_id, item.id],
    );

    // Return a boolean indicating if the update was successful
    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id: number) {
    // Execute the SQL DELETE query to remove an item by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from item where id = ?",
      [id],
    );

    // Return a boolean indicating if the delete was successful
    return result.affectedRows > 0;
  }
}

export default new ItemRepository();
