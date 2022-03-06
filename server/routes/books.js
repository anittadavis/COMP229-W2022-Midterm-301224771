// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book

    /*****************
     * ADD CODE HERE *
     *****************/
router.get('/add',(req, res, next) => {
res.render('books/details', {title: 'Add Books', book})

});


// POST process the Book Details page and create a new Book - CREATE


    /*****************
     * ADD CODE HERE *
     *****************/

    
router.post('/add',(req,res,next) => {
  let newbook = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre,
      

  });

  book.create(newbook, (err, book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh the books list
          res.redirect('/books');

      }
  });

});


// GET the Book Details page in order to edit an existing Book

    /*****************
     * ADD CODE HERE *
     *****************/

     router.get('/edit/:id', (req,res,next) => {
      let id = req.params.id;
  
      book.findById(id, (err, booksToEdit) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              //show the edit view
              res.render('books/details', {title: 'Edit book', book: booksToEdit,
              displayName: req.user ? req.user.displayName :''})
          }
  
      });
  
  });
  

// POST - process the information passed from the details form and update the document

    /*****************
     * ADD CODE HERE *
     *****************/

     router.post('/edit/:id', (req,res,next) => {
      let id = req.params.id;
  
      let updatedbook = book({
          "_id": id,
          "Title": req.body.title,
          "Description": req.body.description,
          "Price": req.body.price,
          "Author": req.body.author,
          "Genre": req.body.genre,
  
      });
  
      book.updateOne({_id: id}, updatedbook, (err) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              //refresh the books list
              res.redirect('/books');
          }
      });
  
  });
  

// GET - process the delete by user id

    /*****************
     * ADD CODE HERE *
     *****************/
    router.get('/delete/:id', (req,res,next) => {
      let id = req.params.id;
  
      book.remove({_id: id}, (err) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              //refresh the books list
              res.redirect('/books');
          }
  
      });
  
    });


module.exports = router;
