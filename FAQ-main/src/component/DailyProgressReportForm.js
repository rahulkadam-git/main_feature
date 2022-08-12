import React, { useEffect, useState } from "react";
import { Form, Spinner, Table, FormControl } from "react-bootstrap";
import axios from "axios";

function DailyProgressReportForm(props) {
  const initialStateForWorkLog = {
    workLog1: "",
    workLog2: "",
    workLog3: "",
    workLog1MP: "",
    workLog2MP: "",
    workLog3MP: "",
    workLog1ONSA: "",
    workLog2ONSA: "",
    workLog3ONSA: "",
  };

  const [project, setProject] = useState("");
  const [client, setClient] = useState("");
  const [EPC, setEPC] = useState("");
  const [reportPreparedBy, setreportPreparedBy] = useState("");
  const [initialStateForWL, setInitialStateForWL] = useState(
    initialStateForWorkLog
  );
  const [picLoading, setPicLoading] = useState(false);
  const [siteImgs, setSiteImgs] = useState([]);

  const [generalNotes, setGeneralNotes] = useState("");
  const [safetyObservations, setSafatyObservation] = useState("");
  const [qualityControlAbs, setQualityControlAbs] = useState("");

  const [initialQuestion, setInitialQuestion] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/allQuestions"
        );

        const safety_question = data.map((d) => {
          return {
            _id: d._id,
            question: d.Question,
            n_a: false,
            no: false,
            yes: false,
          };
        });
        setInitialQuestion(safety_question);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleWorkLog = (e) => {
    const { name, value } = e.target;
    setInitialStateForWL({
      ...initialStateForWL,
      [name]: value,
    });
  };

  const handleQuestionsinput = (val, index, e) => {
    console.log(val, index, e.target.value, e.target.name);
  };
  console.log(initialQuestion);
  //upload images
  const imgsUpload = (screenshots) => {
    console.log(screenshots);
    setPicLoading(true);
    let urls = [];
    for (const screenshot of screenshots) {
      const data = new FormData();
      data.append("file", screenshot);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dkh3nvhkt");
      fetch("https://api.cloudinary.com/v1_1/dkh3nvhkt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          urls.push(data.url.toString());
          setSiteImgs(urls);
          setPicLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const work_logs = [
      {
        description: initialStateForWL.workLog1,
        manpower: initialStateForWL.workLog1MP,
        onsite_assignment: initialStateForWL.workLog1ONSA,
      },
      {
        description: initialStateForWL.workLog2,
        manpower: initialStateForWL.workLog2MP,
        onsite_assignment: initialStateForWL.workLog2ONSA,
      },
      {
        description: initialStateForWL.workLog3,
        manpower: initialStateForWL.workLog3MP,
        onsite_assignment: initialStateForWL.workLog3ONSA,
      },
    ];

    const report = {
      details: { project, client, EPC, report_prepared_by: reportPreparedBy },
      work_logs,
      general_notes: generalNotes,
      safety_observations: safetyObservations,
      quality_control_obs: qualityControlAbs,
      site_photos: siteImgs,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/dailyreport",
        report
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dprForm">
      <div className="progress-header">
        <div className="title">Daily Progress Reports</div>
      </div>
      <div className="dailyProgressReportForm">
        <Form onSubmit={handleSubmit}>
          <div className="details">
            <Form.Label className="section-title">Details</Form.Label>
            <Table borderless>
              <tbody>
                <tr>
                  <td>
                    <Form.Label className="details-labels">Project</Form.Label>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter project name"
                      onChange={(e) => setProject(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Form.Label className="details-labels">Client</Form.Label>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter client name"
                      onChange={(e) => setClient(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Form.Label className="details-labels">EPC</Form.Label>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter EPC"
                      onChange={(e) => setEPC(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Form.Label className="details-labels">
                      Report prepared by
                    </Form.Label>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Report prepared by"
                      onChange={(e) => setreportPreparedBy(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="work-logs">
            <Form.Label className="section-title">Work logs</Form.Label>

            <Table borderless>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Manpower</th>
                  <th>On-site assignment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Select
                      aria-label="Default select example"
                      name="workLog1"
                      // value={initialStateForWL.workLog1}
                      onChange={handleWorkLog}
                    >
                      <option>Description</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Civil Masons Unskilled">
                        Civil Masons Unskilled
                      </option>
                      <option value="Paintern Polish Manpower">
                        Paintern Polish Manpower
                      </option>
                    </Form.Select>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Manpower"
                      name="workLog1MP"
                      //value={initialStateForWL.workLog1MP}
                      onChange={handleWorkLog}
                    />
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Onsite assignment"
                      name="workLog1ONSA"
                      //value={initialStateForWL.workLog1ONSA}
                      onChange={handleWorkLog}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Form.Select
                      aria-label="Default select example"
                      name="workLog2"
                      //value={initialStateForWorkLog.workLog2}
                      onChange={handleWorkLog}
                    >
                      <option>Description</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Civil Masons Unskilled">
                        Civil Masons Unskilled
                      </option>
                      <option value="Paintern Polish Manpower">
                        Paintern Polish Manpower
                      </option>
                    </Form.Select>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Manpower"
                      name="workLog2MP"
                      //value={initialStateForWL.workLog2MP}
                      onChange={handleWorkLog}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Onsite assignment"
                      name="workLog2ONSA"
                      //value={initialStateForWL.workLog2ONSA}
                      onChange={handleWorkLog}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Form.Select
                      aria-label="Default select example"
                      //value={initialStateForWorkLog.workLog3}
                      name="workLog3"
                      onChange={handleWorkLog}
                    >
                      <option>Description</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Civil Masons Unskilled">
                        Civil Masons Unskilled
                      </option>
                      <option value="Paintern Polish Manpower">
                        Paintern Polish Manpower
                      </option>
                    </Form.Select>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Manpower"
                      name="workLog3MP"
                      //value={initialStateForWL.workLog3MP}
                      onChange={handleWorkLog}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Onsite assignment"
                      //value={initialStateForWL.workLog3ONSA}
                      name="workLog3ONSA"
                      onChange={handleWorkLog}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="observations">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="section-title">General notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="General notes"
                onChange={(e) => setGeneralNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="section-title">
                Safety observation
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Safety observation"
                onChange={(e) => setSafatyObservation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="section-title">
                Quality control observation
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Quality control observation"
                onChange={(e) => setQualityControlAbs(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="safety-questions">
            <Form.Label className="section-title">Safety Questions</Form.Label>

            <Table borderless>
              <thead>
                <tr>
                  <th>Questions</th>
                  <th>N_A</th>
                  <th>No</th>
                  <th>Yes</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {initialQuestion.map((val, index) => {
                  return (
                    <tr key={val._id}>
                      <td>{val.question}</td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`n_a${index}`}
                          value={val.n_a}
                          onChange={(e) => handleQuestionsinput(val, index, e)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`no${index}`}
                          value={val.no}
                          onChange={(e) => handleQuestionsinput(val, index, e)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`yes${index}`}
                          value={val.yes}
                          onChange={(e) => handleQuestionsinput(val, index, e)}
                        />
                      </td>
                      <td>
                        <FormControl
                          placeholder="Description"
                          aria-label="Description"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="customFile">
              Please select a photo
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              accept="images/*"
              multiple
              onChange={(e) => imgsUpload(e.target.files)}
            />
          </div>
          <div className="submit-Complain">
            {picLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <button className="submit-btn btn btn-secondary">Submit</button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DailyProgressReportForm;
