import { Form, Input, Button, notification } from 'antd';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';

const Admin = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
    console.log('Success:', values);
        if(values['email'] == 'yongchaox1@student.unimelb.edu.au' && values['password'] == '123') {
            notification.open({
                message: 'Notification',
                description: '✅ Verified!',
            });
            history.push('/interests');
        }else {
            notification.open({
                message: 'Notification',
                description: '❌ Not Verified!',
            });
            form.resetFields();
        }
        
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
 
    return (
    <Form
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
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    >

    <Form.Item
        name="email"
        label="Admin Email"
        rules={[
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
        {
            required: true,
            message: 'Please input your E-mail!',
        },
        ]}
    >
        <Input placeholder='yongchaox1@student.unimelb.edu.au'/>
    </Form.Item>

    <Form.Item
        label="Admin Password"
        name="password"
        rules={[
        {
            required: true,
            message: 'Please input your password!',
        },
        ]}
    >
        <Input.Password />
    </Form.Item>

    <Form.Item
        wrapperCol={{
        offset: 4,
        span: 16,
        }}
    >
        <Button type="primary" htmlType="submit">
        Verify
        </Button>
    </Form.Item>
    </Form>
    );
}

export default Admin;