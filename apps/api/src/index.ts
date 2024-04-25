import { Hono } from 'hono'
import cube from "@cubejs-client/core";

const app = new Hono()

const cubeApi = cube(
  process.env.CUBE_API_TOKEN ?? "",
  {
    apiUrl:
    process.env.CUBE_API_URL ?? "",
  }
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/cube', async (c) => {
  
  const resultSet = await cubeApi
  .load({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "month",
      },
    ],
    dimensions: ["Orders.status"],
  });

  console.log(`resultSet: ${JSON.stringify(resultSet)}`);

  return c.text(JSON.stringify(resultSet))
})


export default app
