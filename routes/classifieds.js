
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image', 'created_at'])
    .then((classifieds) => {
      res.json(classifieds);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image', 'created_at'])
    .where('classifieds.id', req.params.id)
    .then((classified) => {
      res.json(classified[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const newClassified = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  };

  let valuePresentForAllProperties = true;
  for (let prop in newClassified) {
    if (!newClassified[prop]) {
      valuePresentForAllProperties = false;
    }
  }

  if (valuePresentForAllProperties) {
    knex('classifieds')
      .insert(newClassified, ['id', 'title', 'description', 'price', 'item_image', 'created_at'])
      .then((classified) => {
        res.json(classified[0]);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.sendStatus(500);
  }
});

router.patch('/:id', (req, res, next) => {
  const { title, description, price, item_image } = req.body;
  const classifiedUpdate = {};

  if (title) {
    classifiedUpdate.title = title;
  }
  if (description) {
    classifiedUpdate.description = description;
  }
  if (price) {
    classifiedUpdate.price = price;
  }
  if (item_image) {
    classifiedUpdate.item_image = item_image;
  }

  let updatesPresent = false;
  for (let prop in classifiedUpdate) {
    if (classifiedUpdate[prop]) {
      updatesPresent = true;
    }
  }

  if (updatesPresent) {
    knex('classifieds')
      .where('classifieds.id', req.params.id)
      .then((classified) => {
        if (!classified[0]) {
          res.sendStatus(500);
        }
        knex('classifieds')
          .where('classifieds.id', req.params.id)
          .update(classifiedUpdate, ['id', 'title', 'description', 'price', 'item_image', 'created_at'])
          .then((updatedClassified) => {
            res.json(updatedClassified[0]);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.sendStatus(500);
  }
});

router.delete('/:id', (req, res, next) => {
  knex('classifieds')
    .delete(['id', 'title', 'description', 'price', 'item_image'])
    .where('classifieds.id', req.params.id)
    .then((classified) => {
      if (!classified[0]) {
        res.sendStatus(500);
      } else {
        res.json(classified[0]);
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
