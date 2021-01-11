export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.sessionToken) {
    return { 'Authorization': 'Bearer ' + user.sessionToken };
  } else {
    return {};
  }
}