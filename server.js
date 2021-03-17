const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

app.get('/api/things', async (req, res, next) => {
  try {
    res.send(await Thing.findAll());
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_db'
);

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
  },
});

const Thing = db.define('thing', {
  name: {
    type: DataTypes.STRING,
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all([
    User.create({ name: 'moe' }),
    User.create({ name: 'larry' }),
    User.create({ name: 'lucy' }),
  ]);
  await Promise.all([
    Thing.create({ name: 'foo' }),
    Thing.create({ name: 'bazz' }),
    Thing.create({ name: 'lucy' }),
  ]);
};

init();
