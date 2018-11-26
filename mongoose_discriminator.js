/* MONGOOSE DISCRIMINATORS
  How to work with DISCRIMINATORS in mongoose

  NodeJs  : 8.9.4
  Mongoose: 5.3.8 
  @status: working
  @ref1: https://dev.to/helenasometimes/getting-started-with-mongoose-discriminators-in-expressjs--22m9
  @ref2: (Official doc: discriminator)[https://mongoosejs.com/docs/discriminators.html]
*/




var dbUrl = "mongodb://localhost:27018/development";
var mongoose = require('mongoose');
mongoose.connect(dbUrl);


//  ###############  Not Using Discriminators  ##################
// --- The Ugly way ---


/* DEFINE MODELS */
/*
// Define our schemas - BookSchema and MovieSchema
const BookSchema_ = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    release_date: { type: Date, required: true },
  }
);
const MovieSchema_ = new mongoose.Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    release_date: { type: Date, required: true },
  }
);
const TvshowSchema_ = new mongoose.Schema(
  {
    title: { type: String, required: true },
    season: { type: Number, required: true },
    release_date: { type: Date, required: true },
  }
);



// Create a model from our schema - MovieSchema
BookModel = mongoose.model('Book', BookSchema_);
MovieModel = mongoose.model('Movie', MovieSchema_);
TvShowModel = mongoose.model('Tvshow', TvshowSchema_);
*/

/* 
Now on, if you want to add or modify a shared field, such like title, you'll need
to modify all the Schemas and Models; same for defining a new category, mostly similar to
these.



Mongoose offers a better solution: the discriminators.
It allows you to performe inheritance-like definitions through discriminatorKey.
Let's see how.
*/


// ############### Using Discriminators ###################
// --- A better wway ---



// Discriminator options 
const baseOptions = {
  discriminatorKey: 'itemtype', // our discriminator key, could be anything
  collection: 'items', // the name of our collection
};

// Basic Schema definition (parent-like Schema)
const Base = mongoose.model('Base', new mongoose.Schema({
      title: { type: String, required: true },
      date_added: { type: Date, required: true },
      redo: { type: Boolean, required: false },
    }, baseOptions,
  ),
);

// Schemas definition (child-like Schemas)
const Book = Base.discriminator('Book', new mongoose.Schema({
    author: { type: String, required: true },
  }),
);
const Movie = Base.discriminator('Movie', new mongoose.Schema({
  director: { type: String, required: true },
}),
);
const Tvshow = Base.discriminator('Tvshow', new mongoose.Schema({
  season: { type: Number, required: true },
}),
);

// Moodels
BookMod  = mongoose.model('Book');
MovieMod = mongoose.model('Movie');
TvShowMod = mongoose.model('Tvshow');




// # Saving records

const bookdocs = [{
  title: 'The castle', author: 'F.Kafka', date_added: Date.now()
}];

const mooviedocs = [{
  title: 'Matrix', director: 'Wachowsky Bros.', date_added: Date.now()
}];

const tvdocs = [{
  title: 'Games of Thrones', season: 1, date_added: Date.now()
}];

/*
Now we will perform the very meaningful part of this tutorial.
First we are going to create the documents and put them in the mongo collection,
second we are going to get such documents by their *basic* Model, in this case Base,
in order to catch all the records from the db.
We'll see how they are discriminated.
*/
async function exec(){
  console.log('doing');
  await BookMod.create(bookdocs);
  await MovieMod.create(mooviedocs);
  await TvShowMod.create(tvdocs);
  console.log('Getting all');
  const docs = await Base.find(); // find all occurrences
  // Have a look to what differs from a doc to another: itemtype
  docs.forEach( doc => console.log(doc.itemtype) );
};
exec();

/* Done! */