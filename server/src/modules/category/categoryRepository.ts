import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
    id: number;
    name: string;
};

class CategoryRepository {
    async readAll() {
        const [row] = await databaseClient.query<Rows>("select * from category");

        return row as Category[];
    }
}

export default new CategoryRepository();
