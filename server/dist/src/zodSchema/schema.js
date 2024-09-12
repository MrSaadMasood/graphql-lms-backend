import { z } from 'zod';
const zodString = z.string();
const zodNumber = z.number();
const zodBool = z.boolean();
const userInDatabaseSchema = z.object({
    firstName: zodString,
});
export { zodString, zodNumber, zodBool, userInDatabaseSchema };
