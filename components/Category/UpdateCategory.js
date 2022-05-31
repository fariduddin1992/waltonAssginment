
import { Form } from 'react-bootstrap'
import { categorySubmit, gethanddleSubCategoryData, handleCategoryDate, handleUpdateCategoryData } from '../../src/redux/action/CategoryAction';
import Input from '../Input';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { showToast } from '../ToastHelper/ToastHelper';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";

const UpdateCategory = (props) => {

    const { register, handleSubmit, errors, setValue, setFocus } = useForm();
    const dispatch = useDispatch();
    const input = useSelector((state) => state.category.inputData);
    const status = useSelector((state) => state.category.statusCode);

    const [checkSubCategory, setCheckSubCategory] = useState(false);
    const category = useSelector((state) => state.category.subCateList);


    const handleINputChange = (name, value) => {
        let data = {
            name: name,
            value: value
        }
        dispatch(handleCategoryDate(data));
    }
    const onUpdate = async (e) => {
        dispatch(handleUpdateCategoryData(input));
        props.handleClose();
    };

    const handleCheckbox = () => {
        setCheckSubCategory(!checkSubCategory);
        dispatch(gethanddleSubCategoryData());
       
    }
    const subCategoryDropdown =()=>{
        let options = [];
        if (category?.length > 0) {
            category.forEach((item) => {
               
            let itemData = {
              value: item.uid,
              label: item.name,
            };
            options.push(itemData);
          });
        }
        return options;
    }
  

    return (
        <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(onUpdate)}
                method="post"
                encType="multipart/form-data"
                autoComplete="off"
            >
                <Input
                    onChange={(e) =>
                        handleINputChange('category', e.target.value)
                    }
                    type="text"
                    label="Update Category"
                    value={input.category}
                />
                <div className="form-group justify-content-between align-items-center float-left">
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check
                            onChange={() => handleCheckbox()}
                            checked={checkSubCategory}
                            className="forgotPasswordText"
                            type="checkbox"
                            label="subcategory"
                        />
                    </Form.Group>
                </div>
                {
                    checkSubCategory &&
                    <div>
                        <Form.Group  controlId="formGridState">
                            <label className="form-label">Select Category</label>
                            <RHFInput
                                className="formSelect pt-0"
                                as={<Select options={subCategoryDropdown()} />}
                                onChange={(option) => {
                                    handleINputChange('parentCategoryUid', option.value)
                  
                                  }}
                                name="zoneData"
                                register={register}
                                setValue={setValue}
                            />
                        </Form.Group>
                    </div>

                }
                <button
                    type="submit"
                    className="btn btn-primary 
                    btn-sm float-right text-center 
                    custome-addnew-btn item-add-save mt-5"
                >
                    Submit
                </button>

            </form>

        </>
    )
}
export default UpdateCategory