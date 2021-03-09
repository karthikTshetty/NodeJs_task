import express from 'express';

const app = express();
const http = require('http');
const fs = require('fs');
const host = "localhost";
const port = 5000;
require('./database');

const featureSchema = require('./schema');

app.use(express.json());

app.get('/api/features/', async function (req, res) {
  try {
    const allFeatures = await featureSchema.find();
    res.status(200).send(allFeatures)
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api/features', async function (req, res) {
  const feature = new featureSchema({
    feature_id: req.body.feature_id,
    feature_name: req.body.feature_name,
    feature_type: req.body.feature_type,
    feature_description: req.body.feature_description,
    feature_created_timestamp: req.body.feature_created_timestamp,
    feature_version: req.body.feature_version,
    feature_owner: req.body.feature_owner,
    feature_data: req.body.feature_data
  });
  try {
    const savedFeature = await feature.save();
    res.status(200).send(savedFeature);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/features/:id', async (req: any, res: any) => {
  try {
    const deleteFeature = await featureSchema.findByIdAndRemove({ _id: req.params.id });
    res.status(200).send('Feature Deleted : ' + deleteFeature)
  } catch (err) {
    res.status(400).send(err);
  }
})

app.get('/api/features/:id', async (req: any, res: any) => {
  try {
    const curdFeature = await featureSchema.findById(req.params.id);
    res.status(200).send(curdFeature)
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/", (req: any, res: any) => {
  app.use('/static', express.static('public'));
  res.send("http get the data");
});

app.listen(7000, () => {
  console.log('server Started Successfully...!');
})

