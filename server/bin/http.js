const app = require("../app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`E-commerce CMS app listening at http://localhost:${port}`);
});
