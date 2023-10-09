export const errorHandler = (statusCode, messege) => {
  //   console.log(` console of errorhandler ${statusCode}: message ${messege}`);
  const err = new Error();

  err.statusCode = statusCode;
  err.messege = messege;
  console.log(` cons ${err}`);
  return err;
};
