import pg from '../../postgresClient/pgClient';

const resolver = {
  Query: {
    async Book() {
      try {
        const posts = await pg.query(`select * from random`);
        console.log('the posts value is', posts.rows);
        return {
          name: posts.rows[0].name,
        };
      } catch (error) {
        console.log('error occured while getting the posts', error);
      }
    },
  },
};

export default resolver;
