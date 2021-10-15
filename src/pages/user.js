import { Form, Input, Button, notification, Select, Radio, Menu, DatePicker} from 'antd';
import emailjs from 'emailjs-com';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const User = () => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    // const [start, setStart] = useState(moment().format('YYYY-MM-DD'));
    // const [end, setEnd] = useState(moment().add(2, 'month').format('YYYY-MM-DD'));
    const [start, setStart] = useState();
    const [startC, setStartC] = useState();
    const [end, setEnd] = useState();
    const [endC, setEndC] = useState();
    const [typeE, setTypeE] = useState('');
    const [typeC, setTypeC] = useState('');
    const [total, setTotal] = useState(0);
    const [action, setAction] = useState('express');
    const [scheduled, setScheduled] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        let rootRef = firebase.database().ref('interests');
        rootRef.child(params.get('email').replace(/\./g,',')).once("value", snapshot => {
            setScheduled(snapshot.val().scheduled);
            setConfirmed(snapshot.val().confirmed);
            if(snapshot.val().scheduled) {
                setId(snapshot.val().key);
                setName(snapshot.val().schoolName);
                setType(snapshot.val().schoolType);
                setStart(snapshot.val().startDate);
                setEnd(snapshot.val().endDate);
            }
            if(snapshot.val().confirmed) {
                setId(snapshot.val().key);
                setName(snapshot.val().schoolName);
                setType(snapshot.val().schoolType);
                setStartC(snapshot.val().confirmedStartDate);
                setEndC(snapshot.val().confirmedEndDate)
                setTypeC(snapshot.val().specialized);
                if(snapshot.val().specialized == 'yes'){
                    setTotal(snapshot.val().totalStudents)
                }else{
                    setTotal(0)
                }
            }
        });
    }, [])
    
    console.log('action: ', action);
    const onFinishExpress = (values) => {
        console.log('Success:', values);
        emailjs.send("service_sep9kdx","template_xwyy7uq",{
            school_name: values['schoolName'],
            address: values['address'],
            school_type: values['schoolType'],
            message: values['message'],
        }, 'user_PlVBKTjdTEK7Epd5d21SR');
        notification.open({
            message: 'Notification',
            description: '✅ Emailed Admin!',
        });

        const idRef = firebase.database().ref('id');
        let id = 100;
        idRef.once('value', snapshot => {
            if(!snapshot.exists()){
                idRef.set({
                    id: id
                });
                const rootRef = firebase.database().ref('interests');
                const params = new URLSearchParams(location.search);
                rootRef.child(params.get('email').replace(/\./g,',')).set({
                    scheduled: false,
                    confirmed: false,
                    key: id,
                    address: values['address'],
                    schoolName: values['schoolName'],
                    schoolType: values['schoolType'],
                });
            }else{
                idRef.set({
                    id: snapshot.val().id + 1
                });
                const rootRef = firebase.database().ref('interests');
                const params = new URLSearchParams(location.search);
                rootRef.child(params.get('email').replace(/\./g,',')).set({
                    scheduled: false,
                    confirmed: false,
                    key: snapshot.val().id + 1,
                    address: values['address'],
                    schoolName: values['schoolName'],
                    schoolType: values['schoolType'],
                });
            }

        })
        
        form.resetFields();
    };

    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
    };
    
    const dateFormat = 'YYYY-MM-DD';

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleTypeEChange = (value) => {
        setTypeE(value);
    };

    const handleTypeCChange = (value) => {
        setTypeC(value);
    };

    const handleActionChange = (e) => {
        setAction(e.target.value);
    };

    const handleTotalChange = (e) => {
        console.log("total", e.target.value);
        setTotal(e.target.value);
    }

    const disabledStartDate = (current) => {
        return current < moment(start, 'YYYY-MM-DD') || current > moment(end, 'YYYY-MM-DD')
    }

    const hadleStartChange = (values) => {
        //console.log(values.format('YYYY-MM-DD'));
        //console.log(typeof start == 'undefined');
        setStartC(values.format('YYYY-MM-DD'));
    }

    const disabledEndDate = (current) => {
        return current < moment(startC, 'YYYY-MM-DD').add('1', 'week') || current > moment(startC, 'YYYY-MM-DD').add('3', 'week') || current > moment(end, 'YYYY-MM-DD')
    }


    const onFinishConfirm = (values) => {
        const params = new URLSearchParams(location.search);
        console.log('Success:', values);
        let rootRef = firebase.database().ref('interests');
        if(values['specialized'] == 'yes') {
            rootRef.child(params.get('email').replace(/\./g,',')).update({
                confirmed: true,
                confirmedStartDate: values['startDate'].format('YYYY-MM-DD'),
                confirmedEndDate: values['endDate'].format('YYYY-MM-DD'),
                specialized: values['specialized'],
                totalStudents: values['totalStudents']
            });
        }else{
            rootRef.child(params.get('email').replace(/\./g,',')).update({
                confirmed: true,
                confirmedStartDate: values['startDate'].format('YYYY-MM-DD'),
                confirmedEndDate: values['endDate'].format('YYYY-MM-DD'),
                specialized: values['specialized'],
            });
        }

        notification.open({
            message: 'Notification',
            description: '✅ Confirmed!',
        });
    }

    const onFinishCancell = (values) => {
        console.log('Success:', values);
        const params = new URLSearchParams(location.search);
        let interestsRef = firebase.database().ref('interests');
        interestsRef.child(params.get('email').replace(/\./g,',')).set({
            scheduled: false,
            confirmed: false
        });

        notification.open({
            message: 'Notification',
            description: '✅ Cancelled!',
        });

    }

    return (

        <div>
            <Radio.Group value={action} onChange={handleActionChange} style={{ padding: '0 0 10px 220px'}}>
                <Radio.Button value="express" >Expresssion of Interest</Radio.Button>
                <Radio.Button value="confirm" disabled={!scheduled}>Confirmation</Radio.Button>
                <Radio.Button value="cancell" disabled={!confirmed}>Cancellation</Radio.Button>
            </Radio.Group>
            {(action == 'express')
                ?(<Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 7,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinishExpress}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >

            <Form.Item
                name="schoolName"
                label="School Name"
                rules={[
                {
                    required: true,
                    message: 'Please input your school name!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="address"
                label="Address"
                rules={[
                {
                    required: true,
                    message: 'Please input your address!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="city"
                label="City"
                rules={[
                {
                    required: true,
                    message: 'Please input your city!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="state"
                label="State"
                rules={[
                {
                    required: true,
                    message: 'Please input your state!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[
                {
                    required: true,
                    message: 'Please input your postal code!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[
                {
                    required: true,
                    message: 'Please input your postal code!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="schoolType"
                label="School Type"
                rules={[
                {
                    required: true,
                    message: 'Please input your school type!',
                },
                ]}
            >
                <Select style={{ width: 150 }} onChange={handleTypeEChange}>
                    <Option value="hosting">Hosting school</Option>
                    <Option value="visiting">Visiting school</Option>
                </Select>
            </Form.Item>
            
            {(typeE == 'hosting')
                ?<div>
                    <Form.Item
                        name="secureParking"
                        label="Is Secure Parking Present"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your secure parking!',
                        },
                        ]}
                    >
                        <Select style={{ width: 150 }} >
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="totalCarParkingSpaces"
                        label="Total Car Parking Spaces"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your parking spaces!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="totalOpenAreas"
                        label="Total Open Areas"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your open areas!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                :<span></span>
            }

            {(type == 'visiting')
                ?<div>
                    <Form.Item
                        name="visitingSchool"
                        label="Visiting School Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your visiting school name!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="nearestHostSchool"
                        label="Nearest Host School Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your nearest host school!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="distanceFromNearestHostSchool"
                        label="Distance from Nearest Host"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your distance from nearest host school!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </div>
                :<span></span>
            }
            <Form.Item
                name="message"
                label="Message"
                rules={[
                {
                    required: true,
                    message: 'Please input your message!',
                },
                ]}
            >
                        <Input.TextArea rows={4} />
            </Form.Item>


            <Form.Item
                wrapperCol={{
                offset: 4,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Express
                </Button>
            </Form.Item>
                </Form>)
                :<span></span>
            }
            
            {(action == 'confirm')
                ?(
                    <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 7,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishConfirm}
                    autoComplete="off"
                    >
                        <Form.Item label="Acceptance ID"> 
                            <span>{id}</span>
                        </Form.Item>

                        <Form.Item label="School Name" > 
                            <span>{name}</span>
                        </Form.Item>

                        <Form.Item label="School Type"> 
                            <span>{type}</span>
                        </Form.Item>

                        <Form.Item name="startDate" label="Start Date" {...config} >
                            <DatePicker defaultValue={moment(start, dateFormat)} disabledDate = {disabledStartDate} onChange={hadleStartChange}/>
                        </Form.Item>

                        <Form.Item name="endDate" label="End Date" {...config}>
                            <DatePicker disabled={typeof startC == 'undefined'} disabledDate = {disabledEndDate}/>
                        </Form.Item>

                        <Form.Item
                            name="specialized"
                            label="Specialized Activities?"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your specialized Activities!',
                            },
                            ]}>
                            <Select style={{ width: 150 }} onChange={handleTypeCChange}>
                                <Option value="yes">Yes</Option>
                                <Option value="no">No</Option>
                            </Select>
                        </Form.Item>
                        {(typeC == 'yes')
                            ?(<div>
                                <Form.Item
                                name="totalStudents"
                                label="Total Students Participating"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your total students participating!',
                                },
                                ]}
                                >
                                    <Input onChange={handleTotalChange}/>
                                </Form.Item>

                                <Form.Item label="Cost Per Student"> 
                                    <span>$ 30</span>
                                </Form.Item>

                                <Form.Item label="Total Cost"> 
                                    <span>$ {total * 30}</span>
                                </Form.Item>
                            </div>)
                            :<span></span>
                        }

                        
                        <Form.Item
                            wrapperCol={{
                            offset: 4,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                )
                :<span></span>
            }

            {(action == 'cancell')
                ?(
                    <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 7,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishCancell}
                    autoComplete="off"
                    >
                        <Form.Item label="Acceptance ID"> 
                            <span>{id}</span>
                        </Form.Item>

                        <Form.Item label="School Name" > 
                            <span>{name}</span>
                        </Form.Item>

                        <Form.Item label="School Type"> 
                            <span>{type}</span>
                        </Form.Item>

                        <Form.Item label="Start Date" {...config} >
                            <DatePicker defaultValue={moment(startC, dateFormat)} disabled/>
                        </Form.Item>

                        <Form.Item label="End Date" {...config}>
                            <DatePicker defaultValue={moment(endC, dateFormat)}disabled />
                        </Form.Item>

                        <Form.Item
                            label="Specialized Activities?"
                        >
                            <span>{typeC}</span>
                        </Form.Item>
                        {(typeC == 'yes')
                            ?(<div>
                                <Form.Item
                                label="Total Students Participating"
                                
                                >
                                    <span>{total}</span>
                                </Form.Item>

                                <Form.Item label="Cost Per Student"> 
                                    <span>$ 30</span>
                                </Form.Item>

                                <Form.Item label="Total Cost"> 
                                    <span>$ {total * 30}</span>
                                </Form.Item>
                            </div>)
                            :<span></span>
                        }

                        <Form.Item
                            name="reason"
                            label="Reason for Cancellation"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your reason!',
                            },
                            ]}
                        >
                                    <Input.TextArea rows={4} />
                        </Form.Item>

                        
                        <Form.Item
                            wrapperCol={{
                            offset: 4,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Cancell
                            </Button>
                        </Form.Item>
                    </Form>  
                )
                :<span></span>
            }
        </div>
    
    );
}

export default User;