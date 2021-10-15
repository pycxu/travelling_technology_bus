import { Form, Input, Button, notification, Table , DatePicker} from 'antd';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const Rostering = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const [type, setType] = useState('');
    const [start, setStart] = useState();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setName(params.get('schoolname'));

        let rootRef = firebase.database().ref('interests');
        rootRef.orderByChild('schoolName').equalTo(params.get('schoolname')).on('value', snapshot => {
            //console.log(Object.values(snapshot.val())[0].key);
            setId(Object.values(snapshot.val())[0].key);
            setType(Object.values(snapshot.val())[0].schoolType);
        })
    }, [])
    
    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
    };
    
    const disabledStartDate = (current) => {
        return current < moment();
    }

    const hadleStartChange = (values) => {
        console.log(values.format('YYYY-MM-DD'));
        console.log(typeof start == 'undefined');
        setStart(values.format('YYYY-MM-DD'));
    }

    const disabledEndDate = (current) => {
        return current < moment(start, 'YYYY-MM-DD') || current > moment(start, 'YYYY-MM-DD').add('2', 'month')
    }

    const onFinish = (values) => {
        console.log(values['startDate'].format('YYYY-MM-DD'), values['endDate'].format('YYYY-MM-DD'));
        let rootRef = firebase.database().ref('interests');
        rootRef.orderByChild('schoolName').equalTo(name).once('value', snapshot => {
            // console.log(Object.keys(snapshot.val())[0].replace(/\,/g,'.'));
            // console.log(Object.values(snapshot.val())[0]);
            
            rootRef.child(Object.keys(snapshot.val())[0]).update({
                scheduled: true,
                startDate: values['startDate'].format('YYYY-MM-DD'),
                endDate: values['endDate'].format('YYYY-MM-DD')
            });

            emailjs.send("service_sep9kdx","template_ig07qp8",{
                school_name: Object.values(snapshot.val())[0].schoolName,
                id: Object.values(snapshot.val())[0].key,
                address: Object.values(snapshot.val())[0].address,
                school_type: Object.values(snapshot.val())[0].type,
                start_date: values['startDate'].format('YYYY-MM-DD'),
                end_date: values['endDate'].format('YYYY-MM-DD'),
                school_email: Object.keys(snapshot.val())[0].replace(/\,/g,'.'),
            }, 'user_PlVBKTjdTEK7Epd5d21SR');
            notification.open({
                message: 'Notification',
                description: '✅ Emailed School!',
            });
        })
    }
    
    return (
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
        onFinish={onFinish}
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
                <DatePicker disabledDate = {disabledStartDate} onChange={hadleStartChange}/>
            </Form.Item>

            <Form.Item name="endDate" label="End Date" {...config}>
                <DatePicker disabled={typeof start == 'undefined'} disabledDate = {disabledEndDate}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 4,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Schedule
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Rostering;