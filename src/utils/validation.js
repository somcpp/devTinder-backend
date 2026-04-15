const validateEditFields = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "photoURL",
    "gender",
    "about",
    "skills",
    "institution",
    "major",
    "location",
    "phone",
    "linkedin",
    "github",
    "twitter",
    "interests",
    "experience"
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
}

module.exports = {
  validateEditFields
}