const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const mysql = require("mysql");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Ration",
});

const port = 3000;

app.use(
  session({
    secret: "e240cb53fc40db7e259ad5990a2c28d5b5705a50ba8d516145cbb9bac3a04973",
    resave: true,
    saveUninitialized: true,
    cookie:{secure:false}
  })
);
const cors = require('cors'); 


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
const multer = require('multer');
const { error } = require("console");
const { send } = require("express/lib/response");
const upload = multer();
//app.use(upload.none());


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

const memberStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});


const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000*10 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 

const pdfupload = multer({
  storage: memberStorage,
  limits: {
    fileSize: 1000000*10 // 10000000 Bytes = 10 MB
  },
  function (req, file, callback) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const extname = path.extname(file.originalname);
  
    if (allowedExtensions.includes(extname.toLowerCase())) {
      callback(null, true); 
    } else {
      callback(new Error('Only JPG, PNG, and PDF files are allowed'));
    }
  }
}).fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'proof1', maxCount: 1 }, 
  { name: 'proof2', maxCount: 1 } 
])

const profileUpload = multer({
  storage: memberStorage,
  limits: {
    fileSize: 1000000*10 // 10000000 Bytes = 10 MB
  },
  function (req, file, callback) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const extname = path.extname(file.originalname);
  
    if (allowedExtensions.includes(extname.toLowerCase())) {
      callback(null, true); 
    } else {
      callback(new Error('Only JPG, PNG, and PDF files are allowed'));
    }
  }
}).fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'signature', maxCount: 1 }, 
])

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/auth",imageUpload.single('image'), function (request, response) {
  let username = request.body.name;
  let password = request.body.password;
  console.log(username,password,request.body)
  if (username!=undefined && password!=undefined) {
    connection.query(
      "SELECT * FROM Users WHERE rationcardno = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          request.session.userid=results[0].id
          console.log("userid",request.session.userid)
          response.send(results)
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/home",imageUpload.single('image'),(req,res)=>{
  let userid = req.body.id;
  console.log(userid,req.body)
  if (userid!=undefined ) {
    connection.query(
      "SELECT * FROM Members WHERE userid = ? ",
      [userid],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          console.log("userid",userid)
          res.send(results)
        } else {
          res.send("Incorrect Username and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
})

app.post("/signup", imageUpload.single('images'), function (request, response) {
  let username = request.body.name;
  let password = request.body.password;
  let rationcard = request.body.rationcard;
  console.log(username, password, request.body); // Log request body for debugging
  if (username !== undefined && password !== undefined) {
      connection.query( 
          "INSERT INTO Users (name, password, rationcardno) VALUES (?, ?, ?)",
          [username, password, rationcard],
          function (error, results, fields) {
              if (error) {
                  return response.send("Account already created go to login up page ")
              }

              if (results.insertId > 0) {
                  const insertedUserId = results.insertId;
                  signup(insertedUserId, response, request); // Call signup with the inserted user ID
              } else {
                  response.send("Signup failed. Please try again."); // More specific error message
              }
          }
      );
  } else {
      response.send("Please enter Username and Password!");
  }
});

app.post('/addMember',pdfupload,(req,res)=>{
  console.log(req.files,req.body)
  const name=req.body.name;
  const age=req.body.age
  const phone=req.body.phone
  const gender=req.body.gender
  const image=req.files.image[0].path
  const proof1=req.files.proof1[0].path
  const proof2=req.files.proof2[0].path
  const userid=req.body.userid
  connection.query('insert into Members(mname, age, phone,gender, image, proof1, proof2,userid) values(?,?,?,?,?,?,?,?)',
  [name, age, phone, gender, image, proof1, proof2,userid], // Assuming 8 values
  (err, results, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(500)
    } else {
      if(results.insertId>0){
        res.send(results)
      }
      console.log('Member added successfully!');
    }
  }
);
})

app.post('/deleteMember',imageUpload.single('images'),(req,res)=>{
  console.log(req.body)
  connection.query('delete  from Members where id=?',[req.body.id],(error, results, fields)=>{
    if(error){
      console.log(error)
      res.sendStatus(400)
    }else{
      if(results.affectedRows>0){
        res.send("Successfully deleted!")
      }
      console.log(results)
    }
  })
})

function signup(userid, response, request) {
  console.log("called for creating user...")
  connection.query(
      "SELECT * FROM Users WHERE userid = ?",
      [userid],
      function (error, results, fields) {
          if (error) {
              return response.send(error.message)// Log error for debugging; // Send generic error to client
          }

          if (results.length > 0) {
              console.log("userid", userid);
              // Consider using a secure session management library instead of req.session
              // Store only necessary user data in the session
              request.session.loggedIn = true;
              request.session.username = results[0].name;
              request.session.userId = results[0].id; // Use 'userId' for consistency
              response.send(results); // Consider sending only relevant user data
          } else {
              response.send("Incorrect Username and/or Password!");
          }
      }
  );
}


app.post('/profile',profileUpload,(req,res)=>{
  console.log(req.body,req.files)
  let username=req.body.name
  let email=req.body.email
  let bio=req.body.bio
  let image=req.body.image
  let phone=req.body.phone
  if(image==undefined)
    image=req.files.image[0].path
  let signature=req.body.signature
  if(signature==undefined)
    signature=req.files.signature[0].path
  let id=req.body.id
  connection.query(
    "update Users set name=?,email=?,bio=?,image=?,phone=? ,signature=? where userid=?",
    [username, email,bio,image,phone,signature,id],
    function (error, results, fields) {
      
      if (error) throw error;
      console.log(results)
      if (results.affectedRows > 0) {
        req.session.username = username;
        console.log("userid",id)
        res.send(results)
      } else {
        res.send("Incorrect Username and/or Password!");
      }
      res.end();
    }
  );
})

app.post('/notification',imageUpload.single('image'),(req,res)=>{
  console.log(req.body)
  const id=req.body.id
  console.log("userid",id)
  connection.query('select * from Notification where category=? or category=0',[id],(error,results,fields)=>{
    if(error){
      res.send("error in fetching data")
      throw error
    }else{
      if(results.length>0){
        res.send(results)
      }
    }
  })
})

app.post('/rationHistory',imageUpload.single('image'),(req,res)=>{
  console.log("ration history",req.body)
  const userid=req.body.id
  connection.query('select * from History where userid=?',[userid],(error,results,fields)=>{
    if(error){
      throw error
      res.send("error in fetching data")
    }else{
      if(results.length>0){
        console.log(results )
        res.send(results)
      }else{
        console.log("no data found...")
        res.send({
          data:"no data found"
        })
      }
    }
  })
})

app.post('/rationData',imageUpload.single('images'),(req,res)=>{
  console.log("post request arrived",req.body);
  const id=req.body.id
  connection.query('select iquantity,i.name from rationItem as ri,items as i where ri.iid=i.id and rtype=? ;',[id],(error,results,fields)=>{
    if(error){
      res.send({
        error:'error in fetching ration data'
      })
      throw error
    }else{
      console.log("sending ration data...")
      res.send(results)
    }
  })
})



app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("/option");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

app.get("/css", (req, res) => {
  res.sendFile(__dirname + "/login.css");
});
app.get("/profile", (req, res) => {
  
  res.render(__dirname+"/profile")
});

app.get("/indoption", (req, res) => {
  res.sendFile(__dirname + "/indoption.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});
app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});
app.post("/userlist",(req,res)=>{
  console.log("service: ",req.body.service)
  connection.query(
    'select * from services where sname=? and oid=?',
    [req.body.service,req.session.service.id],
    function(error,results,fields){
      if(error) throw error;
      console.log("service",results[0].sid)
      if(results.length>0){
        req.session.serviceName=results[0].sid
      }else{
        req.session.serviceName=0;
      }
      res.sendStatus(200)
    }
  )
})
app.get("/userlist", (req, res) => {
  console.log(req.session.serviceName)
  connection.query(
    "SELECT * FROM Employee where qid=? and userid !=?",
    [req.session.serviceName,req.session.userid],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      if (results.length > 0) {
        console.log("data fetched...",results.length)
        res.render(__dirname+"/userlist",{  
          data:results
        })
      } else {
       // res.send("error in database");
        res.render(__dirname+"/userlist",{
          data:results
        })
      }
      res.end();
    }
  );
});

app.get("/option", (req, res) => {
  connection.query(
    "SELECT * FROM options",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("data fetched...",results.length)
        res.render(__dirname+"/option",{
          data:results
        })
      } else {
        res.send("error in database");
      }
      res.end();
    }
  );
});

app.post('/option',(req,res)=>{
  console.log(req.body.id)
  req.session.service=req.body
  res.redirect('/outdoor')
})

app.get("/outdoor", (req, res) => {
  console.log("connection called")
  connection.query(
    "SELECT * FROM services AS s, options AS o WHERE o.id = s.oid and o.id=?",
    [req.session.service.id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("data fetched...",results.length)
        res.render(__dirname+"/outdoor",{
          data:results
        })
      } else {
        res.send("error in database");
      }
      res.end();
    }
  );
});


app.post('/addservice',(req,res) => {
  var name=req.body.name
  var hour=req.body.hour
  var age=req.body.age
  var phone=req.body.phone
  var email=req.body.email
  var description=req.body.desc
  var salary=req.body.salary
  var eid=0;
  console.log(name,hour,age,phone,email,description,salary)
  if(name ==undefined && hour==undefined && age==undefined){
    connection.query('select * from Employee where userid=?',
    [req.session.userid],
    (error,results,fields)=>{
      if(error) throw error;
      console.log(results)
      eid=results[0].id
      if(results.insertId>0){
        res.sendStatus(200)
      }else{
        res.sendStatus(403)
      }
    })
  }else{
    connection.query('INSERT INTO Employee (name, phone, email, wage, description, hours, age,qid,userid) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)',
    [name,phone,email,salary,description,hour,age,req.session.serviceName,req.session.userid],
    (error,results,fields)=>{
      if(error) throw error;
      console.log(results)
      eid=results[0].id
      if(results.insertId>0){
        res.sendStatus(200)
      }else{
        res.sendStatus(403)
      }
    })
  } 
})

app.get("/addservice", (req, res) => {
  console.log(req.session.serviceName,"serviceName    ")
  connection.query(
    'select * from Employee where userid=? and qid=?',
    [req.session.userid,req.session.serviceName],(error,results,fields)=>{
      if(results.length>0){
        console.log("addsevive",results )
        res.render(__dirname + "/addservice",{
          data:results
        })
      }else{
        res.render(__dirname + "/addservice",{
          data:results
        })
      }
    }
  )
});
app.get("/addsuc", (req, res) => {
  res.sendFile(__dirname + "/addsuc.html");
});
app.get("/book", (req, res) => {
  connection.query(
    'select * from Employer where userid=?',
    [req.session.userid],(error,results,fields)=>{
      if(results.length>0){
        res.render(__dirname + "/book",{
          data:results
        })
      }else{
        res.render(__dirname + "/book",{
          data:results
        })
      }
    }
  )
});

app.post("/choice",(req,res)=>{
  var id=req.body.id
  req.session.employee=id;
  res.sendStatus(200)
})

app.post('/book',(req,res)=>{
  var name=req.body.name
  var address=req.body.address
  var phone=req.body.phone
  var eid=0;
  if(name==undefined&&address==undefined&&phone==undefined){
    connection.query(
      'select * from Employer where userid=?',
      [req.session.userid],(error,results,fields)=>{
        if(results.length>0){
          eid=results[0].id
          console.log("eid is set",eid)
          ExecuteBookingQuery(req,res,eid)
        }else{
          eid=0;
        }
      }
    )
  }else{
    connection.query('INSERT INTO Employer (name, phone, address,qid,userid) VALUES (?, ?, ?, ?, ?)',
    [name,phone,address,req.session.serviceName,req.session.userid],
    (error,results,fields)=>{
      if(error) throw error;
      console.log(results)
      if(results.insertId>0){
        eid=results.insertId;
        console.log("employer created")
        ExecuteBookingQuery(req,res,eid)
      }else{
        console.log("employer not created")
      }
    })
  }
  
})

function ExecuteBookingQuery(req,res,eid){
  connection.query('insert into booking(employee,employer) values (?,?)',
  [req.session.employee,eid],
  (error,results,fields)=>{
    if(error) throw error
    if(results.insertId>0){
      res.sendStatus(200)
    }else{
      res.sendStatus(403)
    }
  })
}

app.get("/booksuc", (req, res) => {
  res.sendFile(__dirname + "/booksuc.html");
});
app.use(express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
