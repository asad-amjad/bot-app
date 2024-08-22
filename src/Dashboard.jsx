import { useState } from "react";
import { marked } from "marked";
import { markdownContent } from "./markdownData";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(markdownContent);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    // const file = event.target.files[0];
    // Handle file processing and API call
  };

  const handleQuerySubmit = () => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setResponse(
        `# Sample Response\n\nThis is a **Markdown** response to demonstrate the formatting.`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">
      {/* Left Panel: User Input Section */}
      <div className="col-md-3 p-3 bg-white shadow rounded h-100">
        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="query"
          >
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
          <label
            className="form-label"
            htmlFor="upload"
          >
            Upload RFP
          </label>
          <input
            type="file"
            id="upload"
            onChange={handleFileUpload}
            className="form-control"
          />
        </div>
        <button
          onClick={handleQuerySubmit}
          className="btn btn-primary w-100"
        >
          Submit
        </button>
      </div>

      {/* Right Panel: Response Display */}
      <div className="col-md-9 ms-3 p-3 bg-white shadow rounded h-100">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: marked(response) }}
            className="h-100 overflow-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
