module.exports = (err, req, res, next) => {
  if (!err) {
    return;
  }

  let errMessage = {
    status: 500,
    message: "Internal server error",
  };

  switch (err.name) {
    case "Please fill all fields":
    case "Invalid email / password":
    case "Uploaded file must be image":
    case "Image is required":
    case "You already whislist this product":
    case "Product already in cart":
    case "Product is out of stock":
    case "Can't accept negative quantity":
    case "Stock is limited":
    case "Quantity is required":
      errMessage = {
        ...errMessage,
        status: 400,
        message: err.name,
      };
      break;
    case "Access restricted! Admin only":
    case "Please login first":
    case "Unauthorized user":
      errMessage = {
        ...errMessage,
        status: 401,
        message: err.name,
      };
      break;
    case "Invalid Token":
    case "Action not found":
    case "Whislist not found":
    case "Cart not found":
      errMessage = {
        ...errMessage,
        status: 404,
        message: err.name,
      };
      break;
    case "SequelizeForeignKeyConstraintError":
      errMessage = {
        ...errMessage,
        status: 404,
        message: "Related product not found",
      };
      break;
    default:
      errMessage = {
        ...errMessage,
        status: 400,
        message: err.errors[0].message,
      };
      break;
  }

  res.status(errMessage.status).json({ message: errMessage.message });
};
