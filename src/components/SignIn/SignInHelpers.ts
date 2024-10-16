export const checkExistingUsername = (username: string) => {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (username === localStorage.key(i)) {
      return true;
    }
  }
  return false;
};
