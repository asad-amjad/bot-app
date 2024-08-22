import { useState } from "react";
import { Card, CardBody } from "react-bootstrap";

import styles from "./Dashboard.module.css";

// eslint-disable-next-line react/prop-types
const LeftPanel = ({ handleQuerySubmit, handleFileUpload }) => {
  const [query, setQuery] = useState("");

  return (
    <Card className={`col-md-3 ${styles.leftPanel} shadow`}>
      <CardBody>
        <div className="mb-3">
          <label className="form-label" htmlFor="query">
            Enter your query
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Please generate an initial draft response to this RFP"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="upload">
            Upload RFP
          </label>
          <input
            type="file"
            id="upload"
            onChange={handleFileUpload}
            className="form-control"
          />
        </div>
        <button onClick={handleQuerySubmit} className="btn btn-primary w-100">
          Submit
        </button>
      </CardBody>
    </Card>
  );
};

export default LeftPanel;
