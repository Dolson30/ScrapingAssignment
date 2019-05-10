var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema 
({
    Headline:{type: String, required: true},
    Summary:{type: String, required: false},
    URL:{type: String, required: true}
});

var Story = mongoose.model("Story", Schema);

module.exports = Story;