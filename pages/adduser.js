// import React, { Component } from 'react';
// import axios from 'axios';
// import token from '../token';
// class adduser extends Component {
//   async componentDidMount() {
//     // const res = await axios.get(
//     //   `http://localhost:3000/api/users/getFacbookToken`
//     // );
//     // console.log(res.data);
//     const obj = JSON.parse(token);
//     //console.log(obj);
//     const testToken = [
//       {
//         fb_accessToken:
//           'EAAAAUaZA8jlABAIn4ZAPdIr21rgGDuK88omLaPZBxDg1LOrnbipO9alPol509AenLYIZBismI4izRF3xRIdO6ZBDSTrRu8bRA4SjWyM7hI0HOF9j9fAP3Jf9GMiepZAvb8yAThe2RdFZACY7FueQwfvC0puE0Y7822WP1jdp57rDAZDZD'
//       },
//       {
//         fb_accessToken:
//           'EAAAAUaZA8jlABAIn4ZAPdIr21rgGDuK88omLaPZBxDg1LOrnbipO9alPol509AenLYIZBismI4izRF3xRIdO6ZBDSTrRu8bRA4SjWyM7hI0HOF9j9fAP3Jf9GMiepZAvb8yAThe2RdFZACY7FueQwfvC0puE0Y7822WP1jdp57rDAZDZD'
//       },
//       {
//         fb_accessToken:
//           'EAAAAUaZA8jlABAIn4ZAPdIr21rgGDuK88omLaPZBxDg1LOrnbipO9alPol509AenLYIZBismI4izRF3xRIdO6ZBDSTrRu8bRA4SjWyM7hI0HOF9j9fAP3Jf9GMiepZAvb8yAThe2RdFZACY7FueQwfvC0puE0Y7822WP1jdp57rDAZDZD'
//       },
//       {
//         fb_accessToken:
//           'EAAAAUaZA8jlABAIn4ZAPdIr21rgGDuK88omLaPZBxDg1LOrnbipO9alPol509AenLYIZBismI4izRF3xRIdO6ZBDSTrRu8bRA4SjWyM7hI0HOF9j9fAP3Jf9GMiepZAvb8yAThe2RdFZACY7FueQwfvC0puE0Y7822WP1jdp57rDAZDZD'
//       },
//       {
//         fb_accessToken:
//           'EAAAAUaZA8jlABAIn4ZAPdIr21rgGDuK88omLaPZBxDg1LOrnbipO9alPol509AenLYIZBismI4izRF3xRIdO6ZBDSTrRu8bRA4SjWyM7hI0HOF9j9fAP3Jf9GMiepZAvb8yAThe2RdFZACY7FueQwfvC0puE0Y7822WP1jdp57rDAZDZD'
//       }
//     ];
//     const sliceArr = obj.slice(500, 510);
//     await Promise.all(
//       sliceArr.map(async (t, index) => {
//         const token = t.fb_accessToken;
//         try {
//           const res = await axios({
//             method: 'post',
//             url: 'http://localhost:3000/api/users/loginWithToken',
//             data: { token }
//           });
//           console.log(`index ${index} - success`);
//         } catch (e) {
//           console.log(`index ${index} - error`);
//         }
//       })
//     );
//     console.log('done');
//     // await Promise.all(
//     //   testToken.map(async (token, index) => {
//     //     const token = token.fb_accessToken;
//     //     try {
//     //       const res = await axios({
//     //         method: 'post',
//     //         url: 'http://localhost:3000/api/users/loginWithToken',
//     //         data: { token }
//     //       });
//     //       console.log(`index ${index} - success`);
//     //     } catch (e) {
//     //       console.log(`index ${index} - error`);
//     //     }
//     //   })
//     // );
//   }
//   render() {
//     return (
//       <div>
//         {' '}
//         <h1>AddUser</h1>{' '}
//       </div>
//     );
//   }
// }

// export default adduser;
