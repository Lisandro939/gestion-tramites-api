const express = require('express');
const path = require('path')

const app = express();

const port = process.env.PORT || process.argv[3] || 8081;

const users = require("./data/users.json")

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/views', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  console.log(req)
  res.json({ "msg": "Hello world" });
});

app.get('/CUIL/:CUIL', (req, res) => {
  const { CUIL } = req.params;
  const user = users.find((user) => user.CUITCliente === parseInt(CUIL))
  if (!!user) {
    res.json(
      {
        "status": "200",
        "msg": `The CUIL ${CUIL} is correct`,
        "user": {
          "name": user.nombreCliente,
          "CUIL": user.CUITCliente,
          "address": user.direccionCliente
        }
      }
    );
  } else {
    res.json(
      {
        "status": "400",
        "msg": `User with CUIL ${CUIL} not found`,
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})