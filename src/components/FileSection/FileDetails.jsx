import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./FileDetails.css";
import { Modal, Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import useAuthStore from "../../store/Store";

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 1.5, borderBottom: "1px solid #ccc", pb: 1 }}>
    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="500" sx={{ color: "text.primary" }}>
      {value || "N/A"}
    </Typography>
  </Box>
);
const FileDetails = () => {
  const { fileDetails, setFileDetails } = useAuthStore((state) => ({
    fileDetails: state.fileDetails,
    setFileDetails: state.setFileDetails,
  }));
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = () => {
    setIsModalOpen(true);
  };
  

  return (<>
      <div className="py-4">
        <Accordion defaultActiveKey="0" className="custom-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header 
              onClick={() => setIsOpen(!isOpen)}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center w-100 justify-content-between">
                <h5 className="mb-0">File Details</h5>
                <span className="toggle-icon me-2">
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {fileDetails ? (
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="text-muted small text-uppercase">File Number</label>
                          <p className="mb-0 fw-medium clickable-text" onClick={() => handleShowDetails()}>{fileDetails.fileNo || 'N/A'}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted small text-uppercase">File Name</label>
                          <p className="mb-0 fw-medium">{fileDetails.fileName || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="text-muted small text-uppercase">Subject </label>
                          <p className="mb-0 fw-medium " >{fileDetails.subject || 'N/A'}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted small text-uppercase">Title </label>
                          <p className="mb-0 fw-medium">{fileDetails.title || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle me-2"></i>
                  No file details available.
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
       {/* Modal to Show File Details */}
       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={modalStyle} >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: "center", color: "#1976d2", borderBottom: "2px solid #1976d2" }}>
            File Details: {fileDetails?.fileNo || "N/A"}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Column 1 */}
            <Grid item xs={12} sm={6}>
              <DetailItem label="File Number" value={fileDetails?.fileNo} />
              <DetailItem label="File Type" value={fileDetails?.fileType} />
              <DetailItem label="File Name" value={fileDetails?.fileName} />
              <DetailItem label="Subject" value={fileDetails?.subject} />
              <DetailItem label="Title" value={fileDetails?.title} />
              <DetailItem label="Activity" value={fileDetails?.activity} />
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} sm={6}>
              <DetailItem label="Custodian" value={fileDetails?.custodian} />
              <DetailItem label="Room Number" value={fileDetails?.room} />
              <DetailItem label="Rack Number" value={fileDetails?.rack} />
              <DetailItem label="Cell Number" value={fileDetails?.cell} />
              <DetailItem label="Created By" value={fileDetails?.createdBy} />
              <DetailItem label="Created Date" value={fileDetails?.createdDate} />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="contained" color="error" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      
    </>
  );
};

// Modal Styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "white",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  border: "2px solid #1976d2",
  outline: "none",
};
export default FileDetails;
