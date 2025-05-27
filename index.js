const express = require('express');
const cors = require('cors');
const womenClothesRoute = require('./routes/womenClothesRoute');

const app = express();
app.use(cors());

app.use('/api/women-clothes', womenClothesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
