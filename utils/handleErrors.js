const handleHttpError = (res, message = "ALGO_SUCEDIO", code = 403) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };
