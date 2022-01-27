import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import PORT from "../ENV";
import { Row, Divider, Radio, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function Template() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [radioValue, setRadioVaue] = useState("");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioVaue(e.target.value);
  };
  const getDocs = async () => {
    const response = await axios.get(`http://localhost:${PORT}/getDocs`);
    console.log(response);
    setDocs(response.data);
  };
  useEffect(() => {
    getDocs();
  }, []);

  const radioSelection = () => {
    console.log(radioValue, "is selected");
    navigate("/format", {
      state: {
        formName: radioValue,
      },
    });
  };

  useEffect(() => {
    const loginUser = localStorage.getItem('affidUser');
    console.log(loginUser);
    if(loginUser === null){
      navigate('/', {replace: true});
    }
  }, [])
  return (
    <div>
      <div className="fixed-top bg-white">
        <div className="shadow px-1 mt-2 mx-2 bg-blue rounded  mb-2">
          <NavBar />
        </div>
        <Divider orientation="left" className="bg-white">
          Select the Document
        </Divider>
      </div>
      <div className="template-div m-3 px-5 margin-top-10">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Radio.Group onChange={onChange}>
            <Space direction="vertical">
              {docs.map((doc, index) => (
                <Radio key={index} value={doc.templateTitle} className="mb-3">
                  <img
                    src={doc.fileName}
                    height="100px"
                    width="100px"
                    alt="img"
                  />
                  <span className="mx-4">
                    <b>{doc.templateTitle}</b>
                  </span>
                </Radio>
              ))}
              <button onClick={radioSelection} className="btn btn-primary">
                Next
              </button>
            </Space>
          </Radio.Group>
        </Row>
      </div>
    </div>
  );
}

export default Template;
