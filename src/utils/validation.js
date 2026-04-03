const validateEditFields = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "PhotoURL",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
}

module.exports = {
  validateEditFields
}