const config = require("./knexfile");
const env = "development";
const knex = require("knex")(config[env]);

const input = process.argv[2];

let test = knex("famous_people").whereRaw("first_name LIKE ? OR last_name LIKE ?", [input, input]).asCallback(function (err, rows) {
  if (err) {
      return console.error("error running query", err)
  }
  let n = rows.length;
  console.log("Found " + n + " person(s) with the first or last name containing " + input);
  rows.forEach( (person, index) => {
    console.log((index+1).toString(), ' ', person.first_name, ' ', person.last_name, ' ', person.birthdate)
  });
});