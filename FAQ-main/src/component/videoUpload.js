import React, { useState } from "react";

function VideoUpload(props) {
  const [complainScreenshots, setComplainScreenshots] = useState();
  const [picLoading, setPicLoading] = useState();

  const postDetails = (screenshots) => {
    setPicLoading(true);
    let urls = [];

    for (const screenshot of screenshots) {
      console.log(screenshot.type, "jscjgkHLL");
      console.log(screenshot.size);
      const data = new FormData();
      data.append("file", screenshot);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dkh3nvhkt");
      fetch(
        `https://api.cloudinary.com/v1_1/dkh3nvhkt/${
          screenshot.type === "video/mp4" ? "video" : "image"
        }/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setComplainScreenshots(urls);
          setPicLoading(false);
        });
    }
  };
  console.log(complainScreenshots);
  console.log(picLoading);
  return (
    <div>
      <>hello</>
      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label">
          Choose photos
        </label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          accept="*"
          multiple
          onChange={(e) => postDetails(e.target.files)}
        />
      </div>
    </div>
  );
}

export default VideoUpload;
