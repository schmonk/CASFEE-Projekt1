import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('source/client'));

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(`Hello woorldde`);
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
