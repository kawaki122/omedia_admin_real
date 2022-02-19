import { CloseCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Switch, Tag, Typography } from 'antd';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCustomFieldModal from './AddCustomFieldModal';

import EditCustomFieldModal from './EditCustomFieldModal';
import * as onboardActions from '../../actions/planOnboardAction';
import usePrevious from '../../hooks/usePrevious';
// From antd
const { Title } = Typography;

const CustomFieldDetails = ({ stepThreeData, ...props }) => {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [fields, setFields] = useState([]);
  const prevStepThreeData = usePrevious(stepThreeData);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);
  const[getSelectedEditFieldData,setSelectedEditFieldData] =useState({idx:0,field:null});
  useEffect(() => {
    console.log("stepThreeData",stepThreeData);
    localStorage.setItem('customData', fields);
    if (prevStepThreeData !== stepThreeData) {
      if (stepThreeData !== null && stepThreeData.fields.length !== 0) {
        setFields(stepThreeData.fields);
        setShowCustomFields(true);
      }
    }
  }, [stepThreeData]);

  function handleCancel() {
    setShow(false);
    setShowAddFieldModal(false);
    setSelected(null);
  }
  const handleEditCancel = () => {
    setShowEditFieldModal(false);
  };
  const handleEditCustomField = (idx,fieldData) => {
    debugger
    let opts = [];
    let fieldObject = { field: fieldData.question, type: fieldData.type };
    for (const [key, value] of Object.entries(fieldData)) {
      if (key.includes('option-') && value) {
        opts.push({ option: value });
      }
    }

    if (opts.length != 0) {
      fieldObject = {
        field: fieldData.question,
        type: fieldData.type,
        options: opts,
      };
    }
    let newfields = [...fields];
    newfields[idx] = fieldObject;
    setFields(newfields);
    setShowEditFieldModal(false);
  };
  function handleAddCustomField(fieldData) {
    let opts = [];
    let fieldObject = { field: fieldData.question, type: fieldData.type };
    for (const [key, value] of Object.entries(fieldData)) {
      if (key.includes('option-') && value) {
        opts.push({ option: value });
      }
    }

    if (opts.length != 0) {
      fieldObject = {
        field: fieldData.question,
        type: fieldData.type,
        options: opts,
      };
    }
    if (!selected) {
      localStorage.setItem('data', JSON.stringify([...fields, fieldObject]));
      setFields([...fields, fieldObject]);
    } else {
      fields[selected.index] = fieldObject;
      localStorage.setItem('data', JSON.stringify([...fields]));
      setFields([...fields]);
    }
    setShowAddFieldModal(false);
    setSelected(null);
    setShow(false);
  }

  function handleRemove(i, fields, setFields) {
    const values = [...fields];
    values.splice(i, 1);
    setFields([...values]);
  }

  const handleCustomFieldSwitch = (value) => {
    setShowCustomFields(value);
    if (!value) {
      setFields([]);
      props.onboardActions.clearCustomFields();
    }
  };

  const processFormData = (formData) => {
    props.actionRef.current.validateFields().then(() => {
      // let initField
      // if (fields.length === 1) {
      //     if (formData['question-0']) {
      //         initField = { field: formData['question-0'], type: 'Input Number' }
      //     }
      // }
      let validFields = fields.filter((f) => f.field !== '');
      // if (initField && fields.length === 1) validFields.unshift(initField)
      props.onboardActions.setStepThreeData({
        fields: validFields,
        isSubmitted: true,
        customFieldSwitch: formData.customFieldSwitch,
      });
    });
  };

  const [form] = Form.useForm();
  const renderFields = () => {
    return (
      <Form form={form}>
        {fields.map((field, idx) => {
          console.log('filerd', field)
          form.setFieldsValue({
            [`question-${idx}`]: field.field,
          });
          return (
            <div>
              <Row className="budgetFields">
                <ul className="custom-fields">
                  <li className="type">
                    <Form.Item
                    name={`fieldType-${idx}`}
                    key={`${field.type}-${idx}`}
                  >
                    <Tag className="pcrm-pill" color="black">
                      {field.type}
                    </Tag>
                    </Form.Item>
                  </li>
                  <li className="edit">
                  <Button
                      type="link"
                      // onClick={() => {
                      //   setSelected({ ...field, index: idx });
                      //   setShow(true);
                      // }}
                      onClick={() =>{setSelectedEditFieldData({idx,field});setShowEditFieldModal(true);} }
                    >
                      Edit
                    </Button>
                  </li>
                </ul>
                <ul className="custom-fields">
                  <li className="question">
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.additional !== curValues.additional
                        }
                      >
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name={`question-${idx}`}
                        initialValue={field.field}
                        key={`${field.field}-${idx}`}
                        rules={[
                          () => ({
                            validator(rule, value) {
                              if (!value) {
                                return Promise.reject(
                                  'You can’t keep this empty'
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                        ]}
                      >
                      <p className="budgetTitle">{field.field}</p>
                      {field.options &&
                        <p className="socialLink">
                          {field.options.map(option => (
                            <a href="">{option.option}</a>
                          ))}
                        </p>
                      }
                        {/* <Input
                          label="Questions"
                          // suffix={

                          // }
                        /> */}
                      </Form.Item>
                    </Form.Item>
                  </li>
                  <li className="cancel">
                    <CloseCircleFilled
                      onClick={() => handleRemove(idx, fields, setFields)}
                    />
                  </li>
                </ul>
                {/* <ul className="custom-fields">
                  <li className="selection">
                    Answer one | Answer two | Answer three
                  </li>
                </ul> */}
                {/* <span className="line-seperator"></span> */}
              </Row>
              <Row>
                {/* <Col s
                pan={18}>

                </Col>
                <Col span={6}>
                  <Form.Item
                    name={`fieldType-${idx}`}
                    key={`${field.type}-${idx}`}
                  >
                    <Tag className="pcrm-pill" color="purple">
                      {field.type}
                    </Tag>
                    <CloseCircleFilled
                      onClick={() => handleRemove(idx, fields, setFields)}
                    />
                  </Form.Item>
                  <li className="edit">
                    <Button
                      type="link"
                      onClick={() => {
                        setSelected({ ...field, index: idx });
                        setShow(true);
                      }}
                    >
                      Edit
                    </Button>
                  </li>
                </Col> */}
              </Row>
            </div>
          );
        })}
      </Form>
    );
  };

  return (
    <div>
      <Title level={2}>
        🙌 Good stuff,<br></br> Set custom fields for you’re clients.
      </Title>
      <Form
        ref={props.actionRef}
        layout="vertical"
        size="large"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        onFinish={processFormData}
      >
        <Form.Item
          name="customFieldSwitch"
          label="Show custom fields for this plan?"
          valuePropName="checked"
          tooltip={{
            title: 'Tooltip with customize icon',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Switch
            onChange={(value) => handleCustomFieldSwitch(value)}
            defaultChecked={stepThreeData && stepThreeData.fields.length !== 0}
          />
        </Form.Item>

        {showCustomFields && (
          <>
            {fields.length !== 0 && (
              <div className="pcrm-additional-block-customfield onboard">
                {renderFields()}
                <Row>
                  <Col span="24">
                    <Button
                      type="link"
                      onClick={() => setShowAddFieldModal(true)}
                    >
                      Add another custom field
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
            {/* <div className="pcrm-inlineblock-lnkbtn"> */}
            {fields.length === 0 && (
              <Row>
                <Col span="24">
                  <Button
                    type="link"
                    onClick={() => setShowAddFieldModal(true)}
                  >
                    Add another custom field
                  </Button>
                </Col>
              </Row>
            )}
            {/* </div> */}
          </>
        )}
      </Form>
      {(showAddFieldModal || show) && (
        <AddCustomFieldModal
          onCancel={handleCancel}
          onAddField={handleAddCustomField}
          setShow={setShow}
          selected={selected}
        />
      )}
   {showEditFieldModal && (
        <EditCustomFieldModal
          getSelectedEditFieldData={getSelectedEditFieldData}
          onCancel={handleEditCancel}
          onEditField={handleEditCustomField}
        />
      )}
    </div>
  );
};

CustomFieldDetails.propTypes = {
  onboardActions: PropType.object,
  actionRef: PropType.any,
  isLoading: PropType.bool,
  stepThreeData: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    stepThreeData: state.planOnboard.stepThreeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onboardActions: bindActionCreators(onboardActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomFieldDetails);
