import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const SimpleModal = (props) => {
    const { show, showLoadingPortModal, handleClose, handleShow, size, modalTitle, handleCloseLoadingPortModal, status, vesselBookingID, PRDetailsID, id } = props;
    return (
        <Modal
            onClose={handleClose ? handleClose : handleCloseLoadingPortModal}
            size={size}
            show={show ? show : showLoadingPortModal}
            onHide={handleClose ? handleClose : handleCloseLoadingPortModal} >

            <Modal.Header closeButton>
                <Modal.Title>

                    <div className="row custom-modal">
                        <div className="col-12">{modalTitle}
                            {
                                vesselBookingID && <Badge className="ml-2" variant="success">Booking ID : #{vesselBookingID} </Badge>
                            }
                            {
                                PRDetailsID ? (<Badge className="ml-2" variant="success">Purchase Request ID : #{PRDetailsID}</Badge>) : ''
                            }
                            {
                                id ? (<Badge className="ml-2" variant="success"> #{id}</Badge>) : ''
                            }
                        </div>
                        {
                            status && <div className="col-6 float-right">
                                <button className={status === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (status === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                                    {status !== null && status !== '' ? status : 'Status Not Found'}
                                </button>
                            </div>
                        }
                    </div>
                </Modal.Title>
                <p className="btn-modal-close" onClick={() => handleClose ? handleClose() : handleCloseLoadingPortModal()}>
                    <i className="fa fa-times text-danger" ></i>
                </p>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

export default SimpleModal;