import React, { useMemo, useState } from "react";
import {
  Button,
  Comment,
  Avatar,
  List,
  Form,
  Input,
  ConfigProvider,
} from "antd";
import { urlHelper } from "../utils/UrlHelper";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <ConfigProvider renderEmpty={()=><div/>}>
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  </ConfigProvider>
);

const Editor = ({ onChange, onSubmit, submitting, value, validation }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <small style={{color: 'red', fontStyle: 'italic'}}>{validation}</small>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function Reviews({ reviews, submitReview }) {
  const [state, setState] = useState({
    submitting: false,
    reviewInput: "",
    validation: ""
  });
  
  const handleChange = (e) => {
    setState(prev => ({...prev, reviewInput: e.target.value, validation: ''}))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!state.reviewInput){
        setState(p => ({...p, validation: 'Please add a review'}))
        return
    }
    setState(prev => ({...prev, submitting: true}))
    submitReview(state.reviewInput).then(res =>{
        setState(prev => ({...prev, submitting: false, reviewInput: ''}))
    })
  };
  return (
    <>
    <div style={{maxHeight: '300px', overflow: 'auto'}}>
    <CommentList comments={reviews} />
      </div>
      <Comment
        avatar={
          <Avatar src={urlHelper.fileUrl('omedia.png')} alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={state.submitting}
            value={state.reviewInput}
            validation={state.validation}
          />
        }
      />
    </>
  );
}

export default Reviews;
