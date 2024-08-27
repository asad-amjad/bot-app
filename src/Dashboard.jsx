import { useState } from "react";
import { marked } from "marked";
import { markdownContent } from "./markdownData";
import TopNavbar from "./components/navbar/TopNavbar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
} from "react-bootstrap";
import LeftPanel from "./LeftPanel";
import styles from "./Dashboard.module.css";
import copyIcon from "./assets/copy.svg";
import downloadIcon from "./assets/download.svg";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files) => {
    // Handle the array of files here
    console.log(files);
    // You can process the files or make an API call here
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
          loading={loading}
        />
        <Card className={`col-md-9 ${styles.rightPanel} shadow `}>
          <CardBody>
            <div className={styles.contentHeader}>
              <img
                src={copyIcon}
                className="logo react"
                alt="React logo"
                width={20}
              />
              <img
                src={downloadIcon}
                className="logo react"
                alt="React logo"
                width={20}
              />
            </div>
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
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
