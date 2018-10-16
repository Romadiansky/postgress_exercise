const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const searchQ = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name
    LIKE $1::text OR last_name LIKE $1::text`, [searchQ], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let people = result.rows;
    let n = people.length;
    console.log("Found " + n + " person(s) with the first or last name containing " + searchQ);
    people.forEach( (person, index) => {
      console.log((index+1).toString(), ' ', person.first_name, ' ', person.last_name, ' ', person.birthdate)
    });
  });
});