var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import pgPool from '../postgresClient/pgClient.js';
import { addTestDataQuery } from '../sqlQueries/reusedSQLQueries.js';
export function csvUploadController(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const file = req.file;
      if (!file || !req.user)
        throw new Error;
      const readStream = createReadStream(file.path);
      const records = [];
      readStream
        .pipe(parse({ delimiter: ',', trim: true, columns: true }))
        .on('data', (data) => {
          records.push(data);
        })
        .on('end', () => __awaiter(this, void 0, void 0, function* () {
          records.shift();
          const insertedData = yield Promise.all(records.map((record) => __awaiter(this, void 0, void 0, function* () {
            const { subject, statement, paper_category, academy_name, option_a, option_b, option_c, correct, explanation, paper_year, difficulty, } = record;
            return yield pgPool.query(addTestDataQuery, [
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
          })));
          const insertedRowCount = insertedData.reduce((acc, data) => {
            if (!data.rowCount)
              return acc;
            return acc + data.rowCount;
          }, 0);
          yield fs.unlink(file.path);
          return res.json(insertedRowCount);
        }))
        .on('error', () => {
          return res.json('some error occured while inserting the rows');
        });
    }
    catch (error) {
      res.json('failed to load the data the File');
    }
  });
}
