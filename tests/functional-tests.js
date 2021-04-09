var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  test("Feed me a file", function(done) {
    var file = fs.readFileSync("uploads/3da5a4c0eb3f26877d09f5427731af8a");
    var scriptName = path.parse("uploads/3da5a4c0eb3f26877d09f5427731af8a").name;
    var stats = fs.statSync("uploads/3da5a4c0eb3f26877d09f5427731af8a");
    var size = stats.size;
    var type = "application/octet-stream";

    chai
      .request(server)
      .post("/api/fileanalyse")
      // .set("content-type", "plain/text")
      //.send( {file: file})
      .attach("upfile", file, scriptName)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        //console.log(res);
        assert.equal(res.body.name, "3da5a4c0eb3f26877d09f5427731af8a");
        assert.equal(res.body.size, size);
        assert.equal(res.body.type, type);
        done();
      });
  });
});
