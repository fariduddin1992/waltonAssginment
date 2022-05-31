
import {createSlice} from "@reduxjs/toolkit"

export const CategorySlice = createSlice({
    name: "Category",
    initialState: {
        isAuth: false,
        categoryList:[],
        subCateList:[],
        data: "",
        isLoading:false,
        categoryCount:0,
        status:false,
        message:null,
        statusCode:null,
        catId:null,
       inputData:{
        category:null,
        parentCategoryUid:""
       },
    
    },
    reducers: {
        handleInput: (state, action) => {
            const cloneObj = {...state.inputData};
            cloneObj[action.payload.name] = action.payload.value;
            state.inputData=cloneObj
        },
        getCategoryData: (state, action) => {
            state.isLoading=action.payload.isLoading
            state.categoryList = action.payload.data.categories
            state.categoryCount=action.payload.data.count
        },
        getSubCategoryList: (state, action) => {
            console.log('action subcae', action);
            state.isLoading=action.payload.isLoading
            state.subCateList = action.payload.data.categories
            state.categoryCount=action.payload.data.count
        },
        submitCategory: (state, action) => {
            state.status=true;
            state.message=action.payload.data.message;
            state.statusCode=action.payload.data.statusCode;
            state.categoryList=[action.payload.data.result,...state.categoryList];
        },
        getUpdateCategoryData: (state, action) => {
            const cloneObj = {...state.inputData};
            cloneObj.category=action.payload.name;
            cloneObj.catId=action.payload.id;
            state.inputData=cloneObj; 
        },
        cleanData: (state, action) => {
            state.statusCode="";
            state.status=false;
            state.inputData.category=""
        },
     
    }
})

