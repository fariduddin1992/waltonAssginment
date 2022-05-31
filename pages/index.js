
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Header from "../components/navbar/header";
import { Form, Table, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
//import { cleanCategoryDate, getCategoryList, gethanddleSubCategoryData, handleUpdateCategoryData } from "../../src/redux/action/CategoryAction";
import SimpleModal from "../components/Modal/SimpleModal";
import Loader from "../components/Loader/Loader";

import { ToastContainer } from "react-toastify";
import { showToast } from "../components/ToastHelper/ToastHelper";
import UpdateCategory from "../components/Category/UpdateCategory";
import { CategorySlice } from "../src/redux/CategorySlice";
import CustomPagination from "../components/SimplePagination/CustomPagination";
import AddCategory from "../components/Category/AddCategory";
import { cleanCategoryDate, getCategoryList, gethanddleSubCategoryData, handleUpdateCategoryData } from "../src/redux/action/CategoryAction";
const { actions: slice } = CategorySlice;



export default function Home({ Component, pageProps }) {

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.categoryList);
  const loading = useSelector((state) => state.category.isLoading);
  const count = useSelector((state) => state.category.categoryCount);
  const categoryCount = useSelector((state) => state.category);
  const statusCode = useSelector((state) => state.category.statusCode);
  const statusMessage = useSelector((state) => state.category.message);
  const status = useSelector((state) => state.category.status);
  const [showAddModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [defaultPageData, setDefaultPageData] = useState(100);

  useEffect(() => {
    dispatch(getCategoryList(defaultPageData))
  }, [])

  useEffect(() => {
    if (statusCode !== null && status == true) {
      showToast("success", `${statusMessage}`);

      dispatch(cleanCategoryDate());
      dispatch(getCategoryList(defaultPageData));
    }
  }, [])
  const handleUpdate = (item) => {
    let itemData = {
      id: item.uid,
      name: item.name
    }
    dispatch(slice.getUpdateCategoryData(itemData));
    setShowEditModal(true);
  }
  const handleAddModale = () => {
    dispatch(getCategoryList(defaultPageData))
    dispatch(cleanCategoryDate());
    setShowModal(true);
  }
  const handlePage = (page) => {
    setDefaultPageData(page);
    dispatch(getCategoryList(page))
  }





  return (
    <>
      <div className="mainContainer">
        <Header />
        <div className="container">
          <div className="card card-custom gutter-b pl-5 pr-5 mb-5 card-top-border mt-5">
            <div className="layout">
              <div className="mb-2">
                <Button variant="outline-primary" onClick={() => handleAddModale()}>Add Category</Button>
              </div>
              {loading && <Loader />}
              <div className="react-bootstrap-table table-responsive border-0 pl-5 ">
                <Table className="table table-head-custom table-vertical-center  item-add-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Category Name</th>
                      {/* <th>Parents category  Name</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      category?.length > 0
                      && category.map((item, index) => (
                        <>
                          <tr>
                            <td>{++index}</td>
                            <td>{item.uid}</td>
                            <td>{item.name}</td>
                          
                          
                           
                            <td>
                              <Button variant="outline-success" size="sm" onClick={() => handleUpdate(item)}>
                                Edit

                              </Button>
                            </td>
                           
                          </tr>
                         
                            {/* {
                              item?.parents.map((child,childIndex)=>(
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>{child.name =='undefined'?'No category':child.name}</td>
                                
                                </tr>
                              ))
                            } */}
                            
                         
                        </>
                      ))
                    }
                  </tbody>
                </Table>
              </div>



              <CustomPagination
                data={category}
                itemsPerPage={5}
                count={count}
                handlePageInfo={handlePage}


              />
            </div>
          </div>
        </div>


        <SimpleModal
          size="md"
          show={showAddModal}
          handleClose={() => setShowModal(false)}
          handleShow={() => setShowModal(true)}
          modalTitle={"Add Category"}
        >

          <AddCategory
            handleClose={() => setShowModal(false)}
          />
        </SimpleModal>
        <SimpleModal
          size="md"
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleShow={() => setShowEditModal(true)}
          modalTitle={"Update Category"}
        >

          <UpdateCategory
            handleClose={() => setShowModal(false)}
          />
        </SimpleModal>
      </div>

    </>
  )
} 