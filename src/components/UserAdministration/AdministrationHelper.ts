/* eslint-disable max-len */
export const checkExistingUsername = (username: string) => {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (username === localStorage.key(i) // Security so that these keys can't get taken when logging in (can still be abused with '${forbiddenKeys}null')
      || username === 'currentUser'
      || username === `totalWinsKey${localStorage.getItem('currentUser')}`
      || username === `currentPlayerScoreKey${localStorage.getItem('currentUser')}`
      || username === `currentComputerScoreKey${localStorage.getItem('currentUser')}`
      || username === 'isLoggedInKey') {
      return true;
    }
  }
  return false;
};

export const checkPasswordForUser = (username: string, password: string) => {
  if (localStorage.getItem(username) === password) return true;
  return false;
};
