import { useState } from "react";
import Joyride from "react-joyride";
import { marked } from "marked";
import { markdownContent } from "../../markdownData";
import { Card, CardBody, Container } from "react-bootstrap";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import styles from "./Dashboard.module.css";
import { FiDownload } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import Tooltip from "../../components/Tooltip/Tooltip";
import rfpLogo from "../../assets/rfp.png";
// import { FiTrash } from "react-icons/fi";
// import { FiTrash2 } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";



const Dashboard = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [tourActive, setTourActive] = useState(true);

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

  // Define the steps for the tour
  const tourSteps = [
    {
      target: "#question-field",
      content: "This is where you can enter your question.",
      placement: "bottom",
    },
    {
      target: "#file-upload-section",
      content: "Drag and drop files here or browse to upload.",
      placement: "top",
    },
    {
      target: "#run-button",
      content: "Click here to run your query.",
      placement: "top",
    },
    {
      target: "#response-area",
      content: "This area will display your response.",
      placement: "left",
    },
  ];

  return (
    <Container className={styles.container}>
      <Joyride
        steps={tourSteps}
        continuous={true}
        showSkipButton={true}
        run={tourActive}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <LeftPanel
        handleQuerySubmit={handleQuerySubmit}
        handleFileUpload={handleFileUpload}
        loading={loading}
        response={response}
      />
      <Card className={`col-md-9 ${styles.rightPanel} shadow`}>
        <CardBody className={styles.cardBody}  id="response-area">
          {response && (
            <div className={`${styles.contentHeader} d-flex justify-content-between align-items-center`}>
            <img src={rfpLogo} alt="RFP logo" width={140} className="mx-auto" />
            <div className="" style={{position: "absolute",right: "35px"}}>
              <Tooltip content="Copy content" place="left">
                <div className="card p-2 me-2" role="button">
                  <FiCopy />
                </div>
              </Tooltip>
          
              <Tooltip content="Download file" place="left">
                <div className="card p-2 me-2" role="button">
                  <FiDownload />
                </div>
              </Tooltip>
              
              <Tooltip content="Clear" place="right">
                <div className="card p-2" role="button" onClick={()=>setResponse("")}>
                  <FiDelete />
                </div>
              </Tooltip>
            </div>
          </div>
          
          )}

          <div
           
            className={` ${response && "card"} p-4`}
            style={{ height: response ? "60vh" : "50vh" }}
          >
            {!response && (
              <div
                className="d-flex justify-content-center flex-column align-items-center"
                style={{ height: "80vh" }}
              >
                <img
                  src={rfpLogo}
                  className={styles.rfplogo}
                  alt="RFP logo"
                  width={400}
                />
                <div className="h-25 mt-4">
                  {loading && (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!loading && response && (
              <div
                dangerouslySetInnerHTML={{ __html: marked(response) }}
                className={`${styles.markdownContent}`}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Dashboard;
