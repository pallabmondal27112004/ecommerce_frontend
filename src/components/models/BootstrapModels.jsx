import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useSelector } from 'react-redux';
import { addReview } from '../../reduxToolKit/reviewSlice';
function Example({ name = "", username = '', product = '', ...rest }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const isLogin = useSelector((store) => store.auth)

  const [formData, setFormData] = useState({ ...rest });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save changes (dispatching action)
  const handleSave = () => {
    console.log("Updated Data:", formData); // You can dispatch this to Redux
    // dispatch({ type: "UPDATE_DATA", payload: formData });
    setFormData(prevData => ({
      ...prevData, 
     
    }));0
    const review ={
      name:isLogin.singleUser &&  isLogin.singleUser.first_name+" "+ isLogin.singleUser.last_name,
      comment:formData.comment,
      rating:parseInt(formData.rating),
      user:username,
      product:product
    }
    console.log(review, "rest")
    dispatch(addReview(review))
    handleClose();
  };
  // React.isValidElement(value) && value.props.placeholder
  // ? value.props.placeholder // Extract the placeholder
  // : typeof value === "object"
  //   ? "[Object]"
  //   : value
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                
                <input
                  type="text"
                  name={key}
                  // value=
                  placeholder={React.isValidElement(value) ? value.props.placeholder : ""}
                  onChange={handleChange}
                  className="form-control mt-2"
                  style={{height:'70px'}}
                />
              </div>
            ))}
          </form>
          {/* <p>{username}</p>
          <p>{product}</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;