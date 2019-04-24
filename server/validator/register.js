const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data){
   let errors = {};

    for (let field in data){
        if(field !== 'aptNumber' && isEmpty(data[field])){
            errors.all = 'Missing required fields!!';
            return errors;
        }
    }
 


    

   console.log(data);


    
}