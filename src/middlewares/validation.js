const validatSignUpData = (req) => {
  const {firstName, lastName,emailId,password} = req.body;

  if(!firstName || !lastName) {
    throw new Error("Name is not valid")
  } else if (firstName.length < 4 || firstName.length>50) {
    throw new Error ("firstName should be 4 - 60 chars");
  }
}

module.exports = {validatSignUpData}