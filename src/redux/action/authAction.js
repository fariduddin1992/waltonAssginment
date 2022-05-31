import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice } from "../slice";
import Axios from 'axios';
import { useQuery, gql } from "@apollo/client";

const { actions: slice } = authSlice;

// login actions
export const loginAction = (phone) => (dispatch) => {
  dispatch(slice.setLogin(phone));
};

// logout action
export const logoutAction = () => (dispatch) => {
  dispatch(slice.setLogout());
};

// get data

// export const getDataAction = () => (dispatch) => {
//   // dispatch(slice.setLogout())
//   fetch("https://jsonplaceholder.typicode.com/todos")
//     .then((response) => {
//       console.log('response', response);
//         if(response.ok){
//             return response.json()
//         } else {
//             console.log("Something went wrong !")
//         }
//     })
//     .then((json) => dispatch(slice.setData(json)))
// };


// export const getDataAction = createAsyncThunk('post/getPost',async(obj,{dispatch})=>{
//   try {
//     let responData={
//         data:{}
//     }
//     let geturl = `https://jsonplaceholder.typicode.com/todos`;
//     await Axios
//       .get(geturl)
//       .then(function(response) {
//         responData.data=response
//         dispatch(slice.setData(response))
//         console.log('response', response);
//       })
//       .catch(function(error) {
//         alert();
//         console.log('error', error)
//       });
//   } catch (err) {
//     console.log('err', err)
    
//   }
// })
export const getDataAction = createAsyncThunk('post/getPost',async(obj,{dispatch})=>{
  Axios({
    url: 'https://devapiv2.walcart.com/graphql',
    method: 'post',
    data: {
      query: `
      {
        getCategories(
        pagination: {
        limit: 500
        skip: 0
        }
        )
        {
        message
        statusCode
        result {
        count
        categories {
        uid
        name
        }
        }
        }
        }
        `
    }
  }).then((results) => {
    console.log(results.data.data.getCategories.result.categories)
    dispatch(slice.setData(results.data.data.getCategories.result.categories))
  });

})