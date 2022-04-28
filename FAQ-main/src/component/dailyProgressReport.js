import React, { useRef } from "react";
import { Table, Form, Col, Row, Container } from "react-bootstrap";
import Logo from "../img/26793ad979409cba8605bb3c532a245e.jpg";
import { dailyReportsData } from "../Data";
import ReactToPrint from "react-to-print";
import Img1 from "../img/john.png";
import Img2 from "../img/obito.jpeg";
import Img3 from "../img/rahul.png";
import Img4 from "../img/rahulk.jpeg";
import Img5 from "../img/rahulka.png";

function DailyProgressReports(props) {
  const componentRef = useRef();

  const imgArray = [Img1, Img2, Img3, Img4, Img5];

  return (
    <div className="dailyreportcomponent">
      <div className="daily-reports" id="divToDownload" ref={componentRef}>
        <div className="progress-header">
          <div className="title">Daily Progress Reports</div>
        </div>
        <div className="daily-progress-report">
          <div className="company-header">
            {" "}
            <div className="logo">
              <img src={Logo} alt="img" />
            </div>
            <div className="company-header-name"></div>
            Vitorscape
          </div>
          <div className="main-header">Daily Progress Reports</div>
          <div className="time">
            <div className="date-time">{dailyReportsData.time}</div>
          </div>
          <div className="break-line"></div>
          <div className="report-details">
            <div className="project-details">
              <div className="details-table">
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Project:</td>
                      <td>{dailyReportsData.details.project}</td>
                    </tr>
                    <tr>
                      <td>Client:</td>
                      <td>{dailyReportsData.details.client}</td>
                    </tr>
                    <tr>
                      <td>EPC:</td>
                      <td>{dailyReportsData.details.EPC}</td>
                    </tr>
                    <tr>
                      <td>Report prepared By:</td>
                      <td>{dailyReportsData.details.report_prepared_by}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="break-line"></div>
          <div className="work-log">
            <div className="box-title">Work Logs</div>
            <Table borderless>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Manpower</th>
                  <th>Onsite Assignment</th>
                </tr>
              </thead>
              <tbody>
                {dailyReportsData.work_logs.work.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>{val.description}</td>
                      <td>{val.manpower}</td>
                      <td>{val.onsite_assignment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="break-line"></div>
          <div className="General-notes">
            <div className="box-title">General Notes</div>
            <div className="notes">{dailyReportsData.general_notes}</div>
          </div>
          <div className="break-line"></div>
          <div className="safety-observation">
            <div className="box-title">Safety-observation</div>
            <div className="notes">{dailyReportsData.safety_observation}</div>
          </div>
          <div className="break-line"></div>
          <div className="quality-control-obs">
            <div className="box-title">Quality Control Observations</div>
            <div className="notes">{dailyReportsData.quality_control_obs}</div>
          </div>
          <div className="break-line"></div>
          <div className="survey-questions">
            <div className="work-log">
              <div className="box-title">Safety Questions</div>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Questions</th>
                    <th>N/A</th>
                    <th>Na</th>
                    <th>Yes</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyReportsData.safety_questions.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td>{val.Quetion}</td>
                        <td>
                          <Form.Check
                            type="radio"
                            value={val.N_A}
                            checked={val.N_A}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="radio"
                            value={val.Na}
                            checked={val.N_A}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="radio"
                            value={val.yes}
                            checked={val.yes}
                          />
                        </td>
                        <td>{val.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="break-line"></div>

          <div className="images">
            <div className="screenshot">
              <div className="box-title">Images</div>
              <Container>
                <Row>
                  {imgArray.map((img) => (
                    <Col sm={2} md={2} ls={2}>
                      <img src={img} alt="img" />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <div className="download">
        <ReactToPrint
          trigger={() => <button>Download</button>}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
}

export default DailyProgressReports;
