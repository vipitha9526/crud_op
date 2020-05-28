var express = require('express');
var router = express.Router();
var ArtEvent = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET add page

router.get('/add', function(req, res, next) {
  res.render('add');
});
router.post('/add',(req,res)=>{
 var post = new ArtEvent({
   name : req.body.name,
   class : req.body.class,
   rollNo : req.body.rollno,
   event : req.body.event
 })

 let promise = post.save();
 promise.then((doc)=>{
   console.log(doc)
 });
 promise.catch((err)=>{
   console.log(err)
 })
  res.redirect("/add");
})

//GET view

router.get('/view', function(req, res, next) {

  var promise =  ArtEvent.find();
  promise.then((result)=>{
    res.render('view',{result : result});
  });
  promise.catch((error)=>{
    console.log(error)
  })
});

router.get('/search',(req,res)=>{
  res.render('search')
})

router.post('/search',(req,res)=>{
  ArtEvent.find({'event': req.body.event})
  .then((data)=>{
    res.render('view',{result : data})
  })
})

//SEARCH

router.get('/delete',(req,res)=>{
  console.log("id = " + req.query.id);
  var id=req.query.id;
  var promise =   ArtEvent.deleteOne({"_id" : id});
  promise.then((data)=>{
    ArtEvent.find({'event': req.query.event})
    .then((data)=>{
      res.render('view',{result : data})
    })
  });
  promise.catch((err)=>{
    console.log(err)
  })
})

//UPDATE

router.get('/update/:id',(req,res)=>{
  var id=req.params.id;
  var promise =ArtEvent.findOne({"_id" : id});
  promise.then((doc)=>{
    res.render('update',{result : doc})
  })
})


router.post('/update/:id',(req,res)=>{
  console.log("id = " + req.params.id);
  var id=req.params.id;
  var promise = ArtEvent.findOne({"_id" : id});
  promise.then((data)=>{
    data.name = req.body.name,
    data.class = req.body.class,
    data.rollNo = req.body.rollno,
    data.event = req.body.event
    console.log(data);
    data.save()
    .then((result)=>{
      res.redirect('/view');
    })
    .catch((err)=>{
      console.log(err);
    })
 
  });
  promise.catch((err)=>{
    console.log(err)
  })
})

module.exports = router;
