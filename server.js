const db = require("inflames.db").sqlite("database");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const axios = require('axios');   
 // For database requests
const _ = require('lodash');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware'ler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });




app.post('/submit-book', (req, res) => {
    const { name, author, bookid } = req.body;
  
    // Veritabanına kayıt
    db.push("books", { name, author, bookid});
    console.log(db.get("books"));
  
    res.status(201).json({ message: 'Veri başarıyla kaydedildi!' });
});

app.post('/submit-form', (req, res) => {
    const { name, schoolnumber } = req.body;
  
    // Veritabanına kayıt
    db.push("students", { name, schoolnumber });
    console.log(db.get("students"));
  
    res.status(201).json({ message: 'Veri başarıyla kaydedildi!' });
});



app.get('/api/initial-data', (req, res) => {
  // Database query logic
  // Replace this with your actual database interaction using inflames.db
  const students = [db.get('students', { name: true, schoolnumber: true })]
  console.log(students)
  res.json(students/* .map(student => ({
      name: student.name,
      schoolnumber: student.schoolnumber
    })) */); // Send initial student data as JSON
});

app.get('/api/initial-data-books', (req, res) => {
  // Database query logic
  // Replace this with your actual database interaction using inflames.db
  const books = [db.get('books', { name: true, author: true, bookid: true })]
  console.log(books)
  res.json(books/* .map(student => ({
      name: student.name,
      schoolnumber: student.schoolnumber
    })) */); // Send initial student data as JSON
});







/* app.get('/api/students', (req, res) => {
    const searchTerm = req.query.search; // Get search term from query parameter
  
    // Database query logic
    // Replace this with your actual database interaction using inflames.db
    const students = [db.get('students', { name: true, schoolnumber: true })]
    console.log(students)
    const filteredStudents = searchTerm ? students.filter(student => student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) : students;
    //console.log(filteredStudents) // Filter based on search term (optional)
  
    res.json(filteredStudents.map(student => ({
        name: student.name,
        schoolnumber: student.schoolnumber
      }))); // Send filtered student data as JSON
  }); */


let PORT = 3000
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
  });

