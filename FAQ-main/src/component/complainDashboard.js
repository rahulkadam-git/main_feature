import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { newComplainAction } from "../Redux/Actions/complain.action";
import { toast } from "react-toastify";

function ComplainDashboard(props) {
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [isApp, setIsApp] = useState(false);
  const [isSoftware, setIsSoftware] = useState(false);
  const [complainText, setComplainText] = useState("");
  const [complainScreenshots, setComplainScreenshots] = useState([]);
  const [subject, setSubject] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const { response } = useSelector((state) => state.complains);
  const dispatch = useDispatch();

  const appMenu = ["In", "Out", "Photo", "Login", "Reports", "email"];
  const softwareMenu = [
    "Mail",
    "Login",
    "Photo",
    "Masterdata",
    "Reports",
    "email",
  ];

  const handleAppType = (e) => {
    setSelectedSubMenu(e.target.value);
    setIsApp(true);
  };

  const handleSoftwareType = (e) => {
    setSelectedSubMenu(e.target.value);
    setIsSoftware(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedSubMenu ||
      !complainText ||
      complainScreenshots.length === 0 ||
      !subject
    ) {
      toast.error("Fill all the details", {
        position: "top-right",
      });
    } else {
      const newComplain = {
        type: { isApp, isSoftware },
        title: selectedSubMenu,
        queryText: complainText,
        queryScreenshots: complainScreenshots,
        subject: subject,
      };
      dispatch(newComplainAction(newComplain));
    }
  };

  useEffect(() => {
    if (response) {
      toast.success(response, {
        position: "top-right",
      });
    }
  }, [response]);

  const postDetails = (screenshots) => {
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
          console.log(data.url.toString());
          urls.push(data.url.toString());
          setComplainScreenshots(urls);
          setPicLoading(false);
        });
    }
  };

  return (
    <div className="complain-form">
      <div className="complain-menu mb-2">
        <form method="post" onSubmit={handleSubmit}>
          <div className="types">
            <div className="app-complain">
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Default select example"
                onChange={handleAppType}
              >
                <option defaultValue="Open this select menu">
                  Open this select menu
                </option>
                {appMenu.map((menu, index) => (
                  <option value={menu} key={index}>
                    {menu}
                  </option>
                ))}
              </select>
            </div>
            <div className="software-complain">
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Default select example"
                onChange={handleSoftwareType}
              >
                <option defaultValue="Open this select menu">
                  Open this select menu
                </option>
                {softwareMenu.map((menu, index) => (
                  <option value={menu} key={index}>
                    {menu}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              value={selectedSubMenu}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Write a complain
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setComplainText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Choose photos
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              accept="images/*"
              multiple
              onChange={(e) => postDetails(e.target.files)}
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
        </form>
      </div>
    </div>
  );
}

export default ComplainDashboard;
