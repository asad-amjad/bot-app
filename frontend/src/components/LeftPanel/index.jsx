import { useState } from "react";
import { Card, CardBody, Badge, CloseButton, Form, Alert } from "react-bootstrap";
import styles from "./LeftPanel.module.css";
import Tooltip from "../Tooltip";
import SubmitButton from "../Button";
import { FiInfo } from "react-icons/fi";

const LeftPanel = ({ handleQuerySubmit, handleFileUpload, loading, response }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(""); // State to track error messages

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    const pdfFiles = filesArray.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length < filesArray.length) {
      setError("Only PDF files are allowed.");
    } else {
      setError(""); // Clear error if only PDFs are selected
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
    handleFileUpload(pdfFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const filesArray = Array.from(event.dataTransfer.files);
    const pdfFiles = filesArray.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length < filesArray.length) {
      setError("Only PDF files are allowed.");
    } else {
      setError(""); // Clear error if only PDFs are selected
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
    handleFileUpload(pdfFiles);
  };

  const handleFileRemove = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Card className={`col-md-3 ${styles.leftPanel} shadow`}>
      <CardBody className="d-flex flex-column justify-content-between h-100">
        
        <Form.Group controlId={"question"} className={styles.querySection}>
          <Form.Label>
            Your Question{" "}
            <Tooltip content="Please enter your question here." place="bottom">
              <FiInfo />
            </Tooltip>
          </Form.Label>
          <textarea
            id="question-field"
            type="text"
            placeholder="Please draft an initial response to the RFP"
            className={styles.textArea}
          />
        </Form.Group>

        <div>
          {error && <Alert variant="danger" dismissible >{error}</Alert>} {/* Show error message */}
          <div
            className="mb-3 d-flex flex-wrap"
            style={{ maxHeight: "160px", overflowY: "scroll" }}
          >
            {selectedFiles.map((file, index) => (
              <Badge
                key={index}
                pill
                bg="secondary"
                className="me-2 mb-2 d-flex align-items-center"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <Tooltip content={file.name} place="bottom">
                  <span>{file.name}</span>
                </Tooltip>
                <CloseButton
                  aria-label="Remove"
                  onClick={() => handleFileRemove(index)}
                  className="ms-2"
                  variant="white"
                />
              </Badge>
            ))}
          </div>

          <div
            id="file-upload-section"
            className={`${styles.dragSection} ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="form-label d-block" htmlFor="upload">
              Drag and drop files here or{" "}
              <span className="text-highlight" style={{ cursor: "pointer" }}>
                browse{" "}
                <Tooltip content="Supported file type: PDF" place="top">
                  <FiInfo />
                </Tooltip>
              </span>
            </label>
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              className="form-control"
              style={{ display: "none" }}
              multiple
              accept="application/pdf"
            />
          </div>

          <SubmitButton
            id="run-button"
            onClick={handleQuerySubmit}
            isLoading={loading}
            label="Run"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default LeftPanel;
