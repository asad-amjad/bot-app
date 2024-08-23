import { useState } from "react";
import { Card, CardBody, Badge, CloseButton } from "react-bootstrap";
import styles from "./Dashboard.module.css";

// eslint-disable-next-line react/prop-types
const LeftPanel = ({ handleQuerySubmit, handleFileUpload }) => {
  const [query, setQuery] = useState("");
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
        <div>
          <div className={`mb-3`}>
            <label className="form-label" htmlFor="query">
              Inputs
            </label>
            <div className={`${styles.topSection}`}>
              <span>User_Question</span>
              <br/>
              <span >Please draft an initial response to the RFP</span>
              {/* <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Please generate an initial draft response to this RFP"
              className="form-control"
            /> */}
            </div>
          </div>
        </div>
        <div>
          <div
            className="mb-3 d-flex flex-wrap"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
          >
            {selectedFiles.map((file, index) => (
              <Badge
                key={index}
                pill
                bg="secondary"
                className="me-2 mb-2 d-flex align-items-center"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {file.name}{" "}
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
            className={`mb-3 p-3 border rounded ${dragging ? "bg-light" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              className="form-label"
              htmlFor="upload"
              style={{ display: "block" }}
            >
              Drag here or{" "}
              <span className="text-primary" style={{ cursor: "pointer" }}>
                Upload files
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
          <button onClick={handleQuerySubmit} className="btn btn-primary w-100">
            Run
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeftPanel;
