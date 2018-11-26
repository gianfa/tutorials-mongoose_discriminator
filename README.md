# tutorials-mongoose_discriminator
Using mongoose discriminators

### Premise ###
If you use NodeJS and like MongoDB, then you're likely to use mongoose, the powerful Mongo engine.
MongoDB is a no-SQL DB, namely, you lose all the advantages of a relational system, for having a more agile and light structure. One of such advantage is the possibility to define tables in a tree-like structure, e.g. Employee as child of Person, inheriting all fields from Person.  
Well, Mongoose makes up for the lack providing discriminators. They act like a hidden field that distinguishes one document from the others, in the same Collection (you can see Mongo Collection as something like a Table in a SQL, remember?).
 
Now, since the documentation about this very simple concept is a little bit sparse, I wrote a ready-to-run example. Hope it will be useful for somebody to not loose time on it.  
Enjoy.

### How to use the code ###
Just run it!
```bash
>node mongoose_discriminator
```

### References ###
[Getting started with Mongoose discriminators in Express.js](https://dev.to/helenasometimes/getting-started-with-mongoose-discriminators-in-expressjs--22m9)
[Official docs: Discriminators](https://mongoosejs.com/docs/discriminators.html)
