const validator = (body, bodyType) => {
  const {description, category, email, dept, title, name} = body;
  let errorsArray = [];
  
  const allowedCategories = ['Activity', 'Lost & Found'];
  const allowedDepartment = ['Admin', 'HR', 'IT', 'Infra'];
  
  if(bodyType === 'buzz'){ // validating for Buzz Body
      if(!description || !category){
        errorsArray.push({ message: "Please fill all fields" });
      }
      if(category && !allowedCategories.includes(category)){
        errorsArray.push({ message: 'Invalid Category type'});
      }
  } 
  else if(bodyType === 'complaint'){  // validating for Complaint Body
      if(!dept || !title || !name || !email || !description){
        errorsArray.push({ message: "Please fill all fields" });
      }

      if(dept && !allowedDepartment.includes(dept)){
        errorsArray.push({ message: 'Invalid Department type'});
      }
      // Email validation
      if(email && email.split('@')[1] !== 'tothenew.com'){
        errorsArray.push({ message: "User doesn't belong to ToTheNew. Check Email!"});
      }
  }

  return errorsArray;
}

module.exports = validator;