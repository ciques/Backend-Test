const fs = require('fs');
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
    var { name, email, phone, reference } = req.body

    try {
        var specialLink = await bcrypt.hash(email, 5)
    
        specialLink = specialLink.slice(1, 10); //user's special link based on email
        specialLink = specialLink.replace('/',''); // remove bars to help with linking on frontend

        // save new user data on a json file
        fs.readFile('scores.json', 'utf8', function readFileCallback(err, data){
    
            if (err){
                console.log(err);
            } else {
                
            // if no users saved create first data
            if (data.length == 0) {
                var object = {
                    users: [],
                };
            }
            else {
                var object = JSON.parse(data); //parse json to object
            }

            // se ja existe email retorna que email ja foi cadastrado
            var error = false
            object.users.forEach((element, index, array) => {
                if(element.email == email){
                    console.log(element.email, email)
                    error = true;
                    return
                }
            })

            if(error){
                return res.status(200).json({error: 'email already registered'})
            }

            // append user to list
            let newUser = {name, email, phone, score: 1, specialLink}

            console.log(newUser)

            object.users.push(newUser); //add user data

            // if signup had a special link add a point to the referer

            if(reference){
                object.users.forEach((element, index, array) => {
                    if(element.specialLink == reference){
                        element.score++
                    }
                })
            }

            var json = JSON.stringify(object); //convert it back to json

            console.log({ name, email, phone, json, object })

            fs.writeFile('scores.json', json, 'utf8', (err) => {  
                // Catch this!
                if (err) throw err;
            
                console.log('Users saved!');
                
            }); // write it back

            return res.status(200).json({error: false, success: specialLink})
            
        }});
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'error' })
    }
  }