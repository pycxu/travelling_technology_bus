import { Form, Input, Button, notification} from 'antd';
import firebase from './firebase/firebase';
import { history, Link } from 'umi';

const Register = () => {
    //firebase.database().ref().remove();
    const [form] = Form.useForm();
    const onFinish = (values) => {
    console.log('Success:', values);

    var rootRef = firebase.database().ref('schools');
    rootRef.child(values['email'].replace(/\./g,',')).once('value', snapshot => {
        if(!snapshot.exists()){
            rootRef.child(values['email'].replace(/\./g,',')).set({
                schoolName: values['schoolName'],
                schoolContactName: values['schoolContactName'],
                schoolContactNumber: values['schoolContactNumber'],
                email: values['email'],
                password: values['password']
            });
            let interestsRef = firebase.database().ref('interests');
            interestsRef.child(values['email'].replace(/\./g,',')).set({
                scheduled: false,
                confirmed: false
            });

            notification.open({
                message: 'Notification',
                description: '✅ Registered successfully!',
            });
        }

        history.push('/login');
    })


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
        label="Schoole Name"
        name="schoolName"
        rules={[
        {
            required: true,
            message: 'Please input your schoole name!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        label="School Contact Name"
        name="schoolContactName"
        rules={[
        {
            required: true,
            message: 'Please input your schoole contact name!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        label="School Contact Number"
        name="schoolContactNumber"
        rules={[
        {
            required: true,
            message: 'Please input your schoole contact number!',
        },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="email"
        label="E-mail address"
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
        <Input />
    </Form.Item>

    <Form.Item
        label="Password"
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
            Register
        </Button>
        <span> Or </span> <Link to="/login">Log in now!</Link>
    </Form.Item>
    </Form>

    );
}

export default Register;