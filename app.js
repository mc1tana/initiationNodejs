//importé express (installer dabord avec npm install express )
const express=require('express');
//creer une app express
const app= express();
//sert a la facilitation de la connection et de la communication entre mongodb et notre server (a ete instalé avec npm instal mongoose)
const mongoose = require('mongoose');
//connection a la bdd de mongodb
mongoose.connect('mongodb+srv://user1:titi@cluster0.mulma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//à ajouter pour que ce qui est envoi par le front pour que le body de la requete soit direct remplit et que lon puisse utiliser req.body 
app.use(express.json());

//permet de faire des requete a des origin differente de notre app ( ex Pour client server origin diff)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // creat avec post
  app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
    next();
  });

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    //modif le status de la requete et jsonifi stuff ici
    res.status(200).json(stuff);
  });

//ne pas oublier d'expoter le module pour le require dans le server.js
module.exports= app;