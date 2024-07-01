const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const mysql = require("mysql");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: "localhost",
  user: "new_user",
  password: "Password@123",
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

app.get("/",(req,res)=>{
  res.send("hai")
})

const admin = require('./admin')

app.get("/adminPanel",(req,res)=>{
  admin(req,res,{
    tableName : 0,
    connection
  })
})


app.get("/adminPanel/table/:tableId/query/:queryId/",(req,res)=>{
  const tableName = req.params.tableId
  const queryType = req.params.queryId
  admin(req,res,{
    tableName,
    queryType,

  connection});
})

app.get("/adminPanel/table/:tableId/query/:queryId/filterColumn/:filterColumn/filterValue/:filterValue",(req,res)=>{
  const tableName = req.params.tableId
  const queryType = req.params.queryId
  const filterColumn = req.params.filterColumn
  const filterValue = req.params.filterValue === "null" ? null : req.params.filterValue
  admin(req,res,{
    tableName,
    queryType,
    filterColumn,
    filterValue,  
  connection});
})

app.get("/adminPanel/table/:tableId/query/:queryId/filterColumn/:filterColumn/filterValue/:filterValue/setColumn/:setColumn/set/:setvalue",(req,res)=>{
  const tableName = req.params.tableId
  const queryType = req.params.queryId
  const filterColumn = req.params.filterColumn
  const filterValue = req.params.filterValue === "null" ? null : req.params.filterValue
  const setColumn = req.params.setColumn
  const setvalue = req.params.setvalue === "null" ? null : req.params.setvalue
  admin(req,res,{
    tableName,
    queryType,
    filterColumn,
    filterValue,  
    setColumn,
    setvalue,
  connection});
})

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

app.use(express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
