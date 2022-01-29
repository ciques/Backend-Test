const fs = require('fs'); 

export default function handler(req, res) {
  fs.readFile('scores.json', 'utf8', function readFileCallback(err, data){
    
    if (err){
      console.log(err);
    } else {
        
      // if no users saved return empty
      if (data.length == 0) {
          var object = {
              users: [],
          };
      }
      else {
          var object = JSON.parse(data); //parse json to object
      }
      
      object.users.sort((a, b) => b.score - a.score);

      object.users.length = 10

      res.status(200).json({ object })
    }
  })
}