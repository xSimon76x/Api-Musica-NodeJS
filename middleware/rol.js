const { handleHttpError } = require("../utils/handleErrors");

/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    const rolesByUser = user.role; // ['user]

    const checkValueRol = roles.some(
      (roleSingle) => rolesByUser.includes(roleSingle) //return true, false
    );

    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSION", 403);
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSION", 403);
  }
};

module.exports = checkRol;
