export const signup = user => (
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: { user }
    })
);
  
export const login = user => (
    $.ajax({
      method: 'POST',
      url: '/api/session',
      data: { user }
    })
);

export const logout = () => (
    $.ajax({
      method: 'DELETE',
      url: '/api/session'
    })
);
  
// export const login = (user) => {
//   const options = {
//     method: 'POST',
//     body: JSON.stringify(user),
//     headers: {
//       // 'Content-Type': 'application/json'
//       'Content-Type': 'application/x-www-form-urlencoded',
//     }
//   }
//   return fetch('api/session', options)
// }
  
//   export const logout = () => {  
//     const options = {
//       method: 'DELETE',
//       headers: {
//         // 'Content-Type': 'application/json'
//         'Content-Type': 'application/x-www-form-urlencoded',
//       }
//     };
  
//     return fetch(`api/session`, options)
//   }