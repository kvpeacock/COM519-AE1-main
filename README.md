# COM519-AE1 - Advanced Database Systems

The live application is hosted [here](https://serene-tor-99412.herokuapp.com/specifications).

<b> Requirements</b>
* Node.js
* MongoDB - for running with MongoDB
* Atlas DB Cluster - for running with Atlas DB


<b> Running locally with MongoDB </b>

* Rename env.local to .env
* Open a terminal in the main folder. Run:
    * <code> npm install </code>
    * <code> npm run seed </code>
    * <code> npm run dev </code>
* The application will open at [localhost:2020](http://localhost:2020).



<b> Running locally with AtlasDB </b>

* Rename env.atlasDB to .env
* Edit the URIs in .env to your cluster address, including username and password.
* Open a terminal in the main folder directory. Run:
    * <code> npm install </code>
    * <code> npm run seed </code> for development, or <code>npm run seedProduction</code> for production.
    * <code> npm run dev </code> to access dev datatabase, or <code> npm run production </code> to access production database.
* The application will open at [localhost:80](http://localhost:80).

Documentation is available [here](documentation/report.md).
