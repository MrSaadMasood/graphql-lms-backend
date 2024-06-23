import { parse } from 'csv-parse';
import { Response } from 'express';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { CustomRequest } from '../__generated__/customRequest';
import pgPool from '../postgresClient/pgClient';
import { addTestDataQuery } from '../sqlQueries/reusedSQLQueries';

type CSVRowStructure = {
  id: string;
  subject: string;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct: string;
  explanation: string;
  paper_year: string;
  difficulty: string;
  paper_category: string;
  academy_name: string;
};
export async function csvUploadController(req: CustomRequest, res: Response) {
  try {
    const file = req.file as Express.Multer.File;
    if (!file || !req.user) throw new Error;
    const readStream = createReadStream(file.path);
    const records: CSVRowStructure[] = [];
    readStream
      .pipe(parse({ delimiter: ',', trim: true, columns: true }))
      .on('data', (data: CSVRowStructure) => {
        records.push(data);
      })
      .on('end', async () => {
        records.shift();
        const insertedData = await Promise.all(
          records.map(async (record) => {
            const {
              subject,
              statement,
              paper_category,
              academy_name,
              option_a,
              option_b,
              option_c,
              correct,
              explanation,
              paper_year,
              difficulty,
            } = record;
            return await pgPool.query(addTestDataQuery, [
              subject,
              paper_category,
              academy_name,
              statement,
              option_a,
              option_b,
              option_c,
              correct,
              explanation,
              parseInt(paper_year),
              difficulty,
            ]);
          }),
        );
        const insertedRowCount = insertedData.reduce((acc, data) => {
          if (!data.rowCount) return acc;
          return acc + data.rowCount;
        }, 0);
        await fs.unlink(file.path);
        return res.json(insertedRowCount);
      })
      .on('error', () => {
        return res.json('some error occured while inserting the rows');
      });
  } catch (error) {
    res.json('failed to load the data the File');
  }
}
