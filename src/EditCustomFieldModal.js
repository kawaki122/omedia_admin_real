import { Button, Col, Form, Input, Modal, Row, Select, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as onboardActions from '../../actions/planOnboardAction'
import { CloseCircleFilled } from '@ant-design/icons';
import { CustomFieldType } from '../../constants/enums';

const EditCustomFieldModal = (
  { getSelectedEditFieldData, onCancel, onEditField, selected, ...props }
) => {
  const formRef = useRef()

  const [options, setOptions] = useState(getSelectedEditFieldData.field.options ? getSelectedEditFieldData.field.options.map(function (obj) {
    return { value: obj.option };
  }) : [""]);
  const [fieldType, setFieldType] = useState(getSelectedEditFieldData.field.type);

  const handleAdd = (fields, setFields) => {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i, fields, setFields) {
    if (i != 0) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
  }

  const handleEditCustomField = (formData) => {
    debugger
    localStorage.setItem("data", JSON.stringify(formData));
    formRef.current
      .validateFields()
      .then(() => {
        onEditField(getSelectedEditFieldData.idx,formData)
      })

  }
  const getInitial = ()=>{
    let map = new Map();
    for (let index = 0; index < getSelectedEditFieldData.field.options.length; index++) {
      map.set(['option-' + index], getSelectedEditFieldData.field.options[index].option);
    }
    let objfinal = Array.from(map).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
    ), {});

    return objfinal
  }
  const renderOptions = () => {

    return (
      options.map((field, idx) => {
        console.log(field ,idx);
        return (
          <Form.Item
            name={`option-${idx}`}
            key={`${field.value}-${idx}`}
          rules={[() => ({
            validator(rule, value) {
              if (!value) {
                return Promise.reject('You can’t keep this empty');
              } else if (value.length > 20) {
                return Promise.reject('option is too lenghty');
              }
              else {
                return Promise.resolve();
              }
            },
          }),]}
          >
            <Input
              // initialValues={field.value}
              defaultValue={field.value}
              // value={field.value}
              addonAfter={<CloseCircleFilled onClick={() => handleRemove(idx, options, setOptions)} />}
              placeholder="Option..."
            />
          </Form.Item>
        )
      })
    )
  }

  return (
    <Modal
      title="Update custom fields for this plan"
      visible={true}
      style={{ top: 100 }}
      cancelButtonProps={{ hidden: false }}
      onCancel={onCancel}
      onOk={onCancel}
      footer={null}
    >

      <Form
        layout="vertical"
        onFinish={handleEditCustomField}
        ref={formRef}
        initialValues={
          Object.assign(
            getInitial,
            { question: getSelectedEditFieldData ? getSelectedEditFieldData.field.field : "", type: getSelectedEditFieldData ? getSelectedEditFieldData.field.type : "" }
          )
        }
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[() => ({
            validator(rule, value) {
              if (!value) {
                return Promise.reject('You can’t keep this empty');
              }
              else {
                return Promise.resolve();
              }
            },
          }),]}
        >
          <Input placeholder="What is your daily ads budget" />
        </Form.Item>

        <Form.Item
          label="Field Type"
          name="type"
          value={selected ? selected.type : ""}
          rules={[() => ({
            validator(rule, value) {
              if (!value) {
                return Promise.reject('You can’t keep this empty');
              } else {
                return Promise.resolve();
              }
            },
          }),]}
        >
          <Select
            placeholder="Select field type"
            allowClear
            onChange={(value) => setFieldType(value)}
          >
            {
              Object.values(CustomFieldType).map((f) => {
                return <Option value={f}>{f}</Option>
              })
            }
          </Select>
        </Form.Item>

        {(fieldType !== '' && fieldType !== CustomFieldType.INPUT_NUMBER && fieldType !== CustomFieldType.INPUT_TEXT && fieldType !== CustomFieldType.TEXT_AREA) && <Form.Item label="Selectable options" >
          {renderOptions()}
          <Button type="link" onClick={() => handleAdd(options, setOptions)}>Add another option</Button>
        </Form.Item>}

        <Form.Item>
          <Space>
            <Button
              type='secondary'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type='primary'
              onClick={() => formRef.current.submit()}
            >
              Update Field
            </Button>
          </Space>
        </Form.Item>
      </Form>

    </Modal>
  );
};


EditCustomFieldModal.propTypes = {
  onboardActions: PropType.object,
  actionRef: PropType.any,
  isLoading: PropType.bool,
  onCancel: PropType.func,
  onEditField: PropType.func,
  getSelectedEditFieldData: PropType.any
};

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onboardActions: bindActionCreators(onboardActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomFieldModal);
