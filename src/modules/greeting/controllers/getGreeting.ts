import express from "express";

const getGreeting = (request: express.Request, response: express.Response):void => {
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
};

export default getGreeting;
