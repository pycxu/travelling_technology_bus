import { Form, Input, Button, notification } from 'antd';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';

const Login = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
    console.log('Success:', values);

        var rootRef = firebase.database().ref('schools');
        rootRef.child(values['email'].replace(/\./g,',')).once('value', snapshot => {
            if(!snapshot.exists()){
                notification.open({
                    message: 'Notification',
                    description: '❌ Invalid email address',
                });
                form.resetFields();
            }else{
                if(values['password'] == snapshot.val().password) {
                    notification.open({
                        message: 'Notification',
                        description: '✅ Login successfully!'
                    });
                    history.push({
                        pathname: '/user',
                        query: {
                          email: values['email'],
                        },
                      });
                }else {
                    notification.open({
                        message: 'Notification',
                        description: '❌ Invalid password!'
                    });
                    form.resetFields();
                }
            }
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
        Log in
        </Button>
        <span> Or </span><Link to="/register">Register now!</Link>
    </Form.Item>
    </Form>
    );
}

export default Login;