const config = require("./knexfile");
const env = "development";
const knex = require("knex")(config[env]);

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

knex("famous_people").insert({first_name: first_name, last_name: last_name, birthdate: birthdate}).asCallback(function (err, result) {
  if (err) {
      return console.error("error running query", err)
  }
  console.log(result);
});