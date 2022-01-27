import React, {useState} from 'react';
import axios from 'axios';
import PORT from '.././../ENV';
import { Form, Input, Button, Upload, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function TemplateSelection() {
    const [fileUrl, setFileUrl] = useState('');
    const [alert, setAlertStatus] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [form] = Form.useForm();
    const onClose = (e) => {
      console.log(e, 'I was closed.');
      setAlertStatus(false);
      setAlertMsg('');
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };
    const onFinish = async(values) => {
        console.log('Success:', values);
        console.log('values.upload[0].name', values.upload[0].originFileObj)
        var fd = new FormData();
        fd.append("file", values.upload[0].originFileObj);
        fd.append("upload_preset", "kqc985b5" )
        const cloudResponse =  await axios.post(`https://api.cloudinary.com/v1_1/dhjkjlag6/image/upload`, fd);
        setFileUrl(cloudResponse.data.url);
        console.log("fileUrl", fileUrl , "new file", cloudResponse.data.url);

        var templateData = new FormData();
        templateData.append('templateTitle', values.templateTitle);
        templateData.append('fileName', cloudResponse.data.url);
        const uploadResp = await axios.post(`http://localhost:${PORT}/uploadfile`,  templateData);
        console.log(uploadResp.data);
        if(uploadResp.status === 200){
          form.resetFields();
          setAlertStatus(true);
          setAlertMsg('Submitted successfully');
        }
        else{
          setAlertStatus(true);
          setAlertMsg("Something went wrong");
        }
        
      };
  
    return (
        <div>
        {
          alert
          ?
          <Alert
          message={`${alertMsg}`}
          type="warning"
          closable
          onClose={onClose}
        />: null
        }
        <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
       
        autoComplete="off"
      >
        <Form.Item
          label="Document Title"
          name="templateTitle"
          rules={[
            {
              required: true,
              message: 'Please input your document title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div>
    )
}

export default TemplateSelection
