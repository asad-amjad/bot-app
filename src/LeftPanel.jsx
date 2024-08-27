import { useState } from "react";
import { Card, CardBody, Badge, CloseButton, Form } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Tooltip from "./components/tooltip/Tooltip"; // Import the enhanced Tooltip component
import SubmitButton from "./components/button/Button";
import { FiInfo } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const LeftPanel = ({ handleQuerySubmit, handleFileUpload, loading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    handleFileUpload(filesArray); // Pass the files to the parent handler if needed
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
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    handleFileUpload(filesArray); // Pass the files to the parent handler if needed
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
            type="text"
            placeholder="Please draft an initial response to the RFP"
            className={styles.textArea}
          />
        </Form.Group>

        <div>
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
            className={`${styles.dragSection} ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="form-label d-block" htmlFor="upload">
              Drag and drop files here or{" "}
              <span className="text-highlight" style={{ cursor: "pointer" }}>
                browse{" "}
                <Tooltip content="Supported file type ...(pending)" place="top">
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
            />
          </div>

          {/* <Tooltip content="Click to submit your query." place="top"> */}
          <SubmitButton
            onClick={handleQuerySubmit}
            isLoading={loading}
            label="Run"
          />
          {/* </Tooltip> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default LeftPanel;
