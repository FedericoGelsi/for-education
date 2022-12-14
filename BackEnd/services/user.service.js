// Gettign the Newly created Mongoose Model we just created 
var UserStudent = require('../models/UserStudent.model');
var UserProfessor = require('../models/UserProfessor.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("getting:",user)

        
        var _details = await UserProfessor.findById({
            
            _id: user._id
            
        });

        if (!_details) {
            var _details = await UserStudent.findById({
                _id: user._id
            });
        }
        

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    if (user.type=='student'){

        var newUser = new UserStudent({
            type: user.type,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            phone: user.phone,
            birthDate: user.birthDate,
            education: user.education,
            createdDate: new Date()
        })
    }

    else{
        var newUser = new UserProfessor({
            
            type: user.type,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            phone: user.phone,
            birthDate: user.birthDate,
            title: user.title,
            experience: user.experience,
            createdDate: new Date()
        })

    }
    
    

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    
    var id = {name :user.name}

    try {
        //Find the old User Object by the Id for Student
        var oldUser = await UserStudent.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {

        try {
            //Find the old User Object by the Id for Professor
            var oldUser = await UserProfessor.findOne(id);
        } catch (e) {
            throw Error("Error occured while Finding the User")
        }
        
        if(!oldUser){
            return false;
        }
        
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    if (oldUser.type="student"){

        oldUser.name = user.name,
        oldUser.lastName = user.lastName,
        oldUser.email = user.email,
        oldUser.password= hashedPassword,
        oldUser.phone= user.phone,
        oldUser.birthDate= user.birthDate,
        oldUser.education= user.education,
        oldUser.password = hashedPassword
    }
    else{
        oldUser.name = user.name,
        oldUser.lastName = user.lastName,
        oldUser.email = user.email,
        oldUser.password= hashedPassword,
        oldUser.phone= user.phone,
        oldUser.birthDate= user.birthDate,
        oldUser.title= user.title,
        oldUser.experience= user.experience,
        oldUser.password = hashedPassword
    }
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)

        
        var _details = await UserStudent.findOne({
            email: user.email,
            
            
        });

        if (!_details) {
            var _details = await UserProfessor.findOne({
                email: user.email
            });
        }
        
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}