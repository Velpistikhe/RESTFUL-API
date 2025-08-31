const app = require("./index");

const port = process.env.APP_PORT || 5000;

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
