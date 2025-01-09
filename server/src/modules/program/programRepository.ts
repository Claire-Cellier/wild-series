import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
        select 
        program.title, program.synopsis, program.poster, program.country, program.year, category.name
        from 
          program 
          left join category on program.category_id = category.id 
        where 
          program.id = ? 
        `,
      [id],
    );

    return rows[0] as Program;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async update(program: Program) {
    const [result] = await databaseClient.query<Result>(
      "update program set title = ? where id = ?",
      [program.title, program.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new ProgramRepository();
