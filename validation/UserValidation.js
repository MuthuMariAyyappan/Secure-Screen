const USER_NAME_REGEX = /^[A-Za-z]\w{7,29}$/;


/*At least two uppercase letters
  At least one special character from !@#$&*
  At least two digits
  At least three lowercase letters
  At least 8 characters in total*/

  const PASSWORD_REGEX = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

const validateUserName = (userName) => {
  if (USER_NAME_REGEX.test(userName)) {
    return true;
  } else {
    const errorMessage = getUserNameErrMsg(userName);
    throw new Error(errorMessage.reason);
  }
};

const getUserNameErrMsg = (userName) => {
  if (userName.length < 8) {
    return { reason: 'Username must be at least 8 characters long.' };
  } else if (userName.length > 29) {
    return { reason: 'Username must not exceed 29 characters.' };
  } else if (!/^[A-Za-z]/.test(userName)) {
    return { reason: 'Username must start with a letter.' };
  } else if (!/^\w+$/.test(userName)) {
    return { reason: 'Username can only contain letters, digits, and underscores.' };
  } else {
    return { reason: 'Invalid username format.' };
  }
};

const validatePassword = (password) => {
  console.log('validatePassword', PASSWORD_REGEX.test(password));
  if (PASSWORD_REGEX.test(password)) {
    return true;
  } else {
    const errorMessage = getPasswordErrMsg(password);
    throw new Error(errorMessage.reason);
  }
};

const getPasswordErrMsg = (password) => {
  if (password.length < 8) {
    return { reason: 'Password must be at least 8 characters long.' };
  } else if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    return { reason: 'Password must contain at least two uppercase letters.' };
  } else if (!/(?=.*[!@#$&*])/.test(password)) {
    return { reason: 'Password must contain at least one special character from !@#$&*.' };
  } else if (!/(?=.*\d.*\d)/.test(password)) {
    return { reason: 'Password must contain at least two digits.' };
  } else if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
    return { reason: 'Password must contain at least three lowercase letters.' };
  } else {
    return { reason: 'Password does not meet the required format.' };
  }
};


module.exports = { 
  validateUserName,
  validatePassword
};