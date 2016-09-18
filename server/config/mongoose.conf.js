// ```
// mongoose.conf.js
// (c) 2016 Louis-Marie Guillemot
// louismarie.guillemot@gmail.com
// mongoose.conf.js may be freely distributed under the MIT license
// ```

module.exports = function(mongoose) {
  var gracefulExit = function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection has disconnected through app termination');
      process.exit(0);
    });
  };

  // Connexion réussie
  mongoose.connection.on('connected', function() {
    console.log('Successfully connected to ', process.env.NODE_ENV, ' database on startup');
  });

  // Problème de connexion
  mongoose.connection.on('error', function(err) {
    console.error('Failed to connect to ', process.env.NODE_ENV, ' database on startup :', err);
  });

  // Déconnexion
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection to ', process.env.NODE_ENV, ' database disconnected');
  });

  // Si le process node est interrompue, fermeture de la connexion
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  // Connexion à la base de données avec la variable d'environnement définie
  mongoose.connect(process.env.MONGO_URI, function(error) {
    if (error) {
      throw error;
    }
  });
};
