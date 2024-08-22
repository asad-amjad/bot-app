import { useState } from "react";
import { marked } from "marked";
import { markdownContent } from "./markdownData";
import styles from "./Dashboard.module.css";
import TopNavbar from "./TopNavbar";
import { Card, CardBody, Container } from "react-bootstrap";
import LeftPanel from "./LeftPanel";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = () => {
    // const file = event.target.files[0];
    // Handle file processing and API call
  };

  const handleQuerySubmit = () => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setResponse(markdownContent);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <TopNavbar />
      <Container className={styles.container}>
        <LeftPanel
          handleQuerySubmit={handleQuerySubmit}
          handleFileUpload={handleFileUpload}
        />
        {/* Right Panel: Response Display */}
        <Card className={`col-md-9 ${styles.rightPanel} shadow `}>
          <CardBody>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: marked(response) }}
                className={styles.markdownContent}
              />
            )}
            {/* </div> */}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
