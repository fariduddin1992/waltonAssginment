import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategorySlice } from "../CategorySlice";
import Axios from 'axios';
import { showToast } from "../../../components/ToastHelper/ToastHelper";
const { actions: slice } = CategorySlice;

export const handleCategoryDate = createAsyncThunk('category', async (data, { dispatch }) => {
  dispatch(slice.handleInput(data));
})
export const cleanCategoryDate = createAsyncThunk('clean', async (data, { dispatch }) => {
  dispatch(slice.cleanData());
})
export const categorySubmit = createAsyncThunk('categoryAdd', async (dataSet, { dispatch }) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: true,
  };
  console.log('dataSet', dataSet);

  await Axios({
    url: 'https://devapiv2.walcart.com/graphql',
    method: 'post',
    data: {
      query: `
    mutation {
      createCategory(
      category: {
      name:"${dataSet.category}"
      parentCategoryUid: "${dataSet.parentCategoryUid}"
      
      }
      )
      {
      message
      statusCode
      result {
      uid
      name
      parent {
      uid
      name
      }
      parents {
      uid
      name
      }
      isActive
      inActiveNote
      createdAt
      updatedAt
      }
      }
      }
      `
    }

  }).then((results) => {
    responseList.data = results.data.data.createCategory;
    showToast("success", `${results.data.data.createCategory.message}`);

  }).catch((e) => {
    console.log('e', e);
  })
  dispatch(slice.submitCategory(responseList));
})

export const handleUpdateCategoryData = createAsyncThunk('categoryUpdate', async (dataSet, { dispatch }) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: true,
  };

  try {
    await Axios({
    url: 'https://devapiv2.walcart.com/graphql',
    method: 'post',
    data: {
      query: `
    mutation {
      updateCategory (
      categoryUid: "${dataSet.catId}"
      category: {
        name:"${dataSet.category}"
      }
      )
      {
      message
      statusCode
      result {
      uid
      name
      parent {
      uid
      name
      }
      parents {
      uid
      name
      }
      isActive
      inActiveNote
      createdAt
      updatedAt
      }
      }
      }
      `
    }

  }).then((results) => {
    responseList.data = results.data.data.updateCategory;
    showToast("success", `${results.data.data.updateCategory.message}`);
  }).catch((e) => {
    console.log('e', e);
  })
  } catch (error) {
    
  }
  
  dispatch(slice.submitCategory(responseList));

})

export const getCategoryList = createAsyncThunk('category', async (skip, { dispatch }) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: true,
  };
  
  dispatch(slice.getCategoryData(responseList))
  await Axios({
    url: 'https://devapiv2.walcart.com/graphql',
    method: 'post',
    data: {
      query: `
        {
          getCategories(
          pagination: {
          limit:10
          skip:${skip}
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
          parent {
            uid
            name
            }
            parents {
            uid
            name
            }
            
          }
          }
          }
          }
          `
    }
  }).then((results) => {
    console.log('results', results);
    console.log("categroy", results.data.data.getCategories.result)
    responseList.data = results.data.data.getCategories.result == null ? [] : results.data.data.getCategories.result;
    responseList.isLoading = false
  });
  dispatch(slice.getCategoryData(responseList))
})
export const gethanddleSubCategoryData = createAsyncThunk('subcate', async (skip, { dispatch }) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: true,
  };
  try {
    await Axios({
      url: 'https://devapiv2.walcart.com/graphql',
      method: 'post',
      data: {
        query: `
        {
          getCategories(
            pagination: {
              limit:1000
              skip:0
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
          parent {
            uid
            name
            }
            parents {
            uid
            name
            }
            
          }
          }
          }
          }
          `
      }
    }).then((results) => {
      console.log('sub result', results);
      console.log("sub result", results.data.data.getCategories.result)
      responseList.data = results.data.data.getCategories.result == null ? [] : results.data.data.getCategories.result;
      responseList.isLoading = false
    });
  } catch (error) {

  }

  dispatch(slice.getSubCategoryList(responseList))
})

