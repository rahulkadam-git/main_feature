import React, { useState } from "react";
import { data } from "./Data";
import { Accordion } from "react-bootstrap";

function QnA(props) {
  const [eventKeyCall, setEventKeyCall] = useState("");

  const handlerCollapse = (index) => {
    if (index === eventKeyCall) {
      setEventKeyCall("");
    } else {
      setEventKeyCall(index);
    }
  };

  const uniqueKey = (fKey, sKey) => {
    return String(fKey) + String(sKey);
  };

  return (
    <div>
      <div className="header">Frequently Asked Questions</div>
      <div className="category">
        {data.map((item, index1) => (
          <li className="category-header" key={index1}>
            {item.type}
            <div
              className="qna-section"
              style={{ height: item.FAQ.length * 62.5 }}
            >
              <div className="qna">
                {item.FAQ.map((qna, index) => (
                  <Accordion
                    activeKey={eventKeyCall}
                    key={uniqueKey(index1, index)}
                  >
                    <Accordion.Item
                      eventKey={uniqueKey(index1, index)}
                      onClick={() => handlerCollapse(uniqueKey(index1, index))}
                    >
                      <Accordion.Header>{qna.Q}</Accordion.Header>
                      <Accordion.Body style={{ fontSize: 20 }}>
                        {qna.A}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default QnA;
