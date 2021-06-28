const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

const addUrlDb = (data) => {

    console.log("HELLO FROM THE BACKEND")
    let db = new sqlite3.Database('db/bookmark.db');


      // insert one row into the langs table
  db.run(`INSERT INTO bookmarks(Title,Description,Img_url,Url) VALUES(?,?,?,?)`, [data.title, data.description, data.image, data.url], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

}


const getUrl  = (req, res) => {

    let getData = {data: []};
  
    let db = new sqlite3.Database('db/bookmark.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the bookmark database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM bookmarks`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row)
        getData.data.push(row)
  
      });
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      res.send(getData)
      console.log('Close the database connection.');
    });
  }
  

exports.addUrlDb = addUrlDb;
exports.getUrl = getUrl;