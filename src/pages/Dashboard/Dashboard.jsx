import { useState } from "react";
import { marked } from "marked";
import { markdownContent } from "../../markdownData";
import { Card, CardBody, Container } from "react-bootstrap";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import styles from "./Dashboard.module.css";
import { FiDownload } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import Tooltip from "../../components/tooltip/Tooltip";
import rfpLogo from "../../assets/rfp.png";

const Dashboard = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files) => {
    console.log(files);
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
    <Container className={styles.container}>
      <LeftPanel
        handleQuerySubmit={handleQuerySubmit}
        handleFileUpload={handleFileUpload}
        loading={loading}
      />
      <Card className={`col-md-9 ${styles.rightPanel} shadow`}>
        <CardBody className={styles.cardBody}>
          {response && (
            <div className={styles.contentHeader}>
              <img src={rfpLogo} alt="RFP logo" width={100} />
              <div className="d-flex align-items-center gap-2">
                <Tooltip content="Copy content" place="bottom">
                  <div className="card p-2" role="button">
                    <FiCopy />
                  </div>
                </Tooltip>

                <Tooltip content="Download file" place="bottom">
                  <div className="card p-2" role="button">
                    <FiDownload />
                  </div>
                </Tooltip>
              </div>
            </div>
          )}

          {!response && !loading && (
            <div className="d-flex justify-content-center flex-column align-items-center h-75">
              <img
                src={rfpLogo}
                className={styles.rfplogo}
                alt="RFP logo"
                width={350}
              />
            </div>
          )}

          {loading ? (
            <div className="d-flex justify-content-center align-items-center h-75">
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
        </CardBody>
      </Card>
    </Container>
  );
};

export default Dashboard;
