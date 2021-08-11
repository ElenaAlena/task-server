import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.get("/", (request, response) => {
  response.send(`<h1>Hello </h1>`);
});
app.get("/api/greetings", (request: express.Request, response: express.Response) => {
  const userName = request.query.name;
  if (userName === undefined) {
    response.setHeader("Content-Type", "application/json");
    response
      .status(400)
      .send(
        JSON.stringify(
          { name: null, message: "The name was not indicated" },
          null,
          3
        )
      );
  } else {
    response.send(`<h1>Hello ${userName}</h1>`);
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
