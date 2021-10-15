import { Form, Input, Button, notification, Table } from 'antd';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';

const Interests = () => {
    const [data, setData] = React.useState([]);
    const columns = [
        {
          title: 'School Name',
          dataIndex: 'schoolName',
          key: 'schoolName',
          render: text => <Link to={{ pathname: '/rostering', search: `?schoolname=${text}`}}>{text}</Link>,
        },
        {
          title: 'School Type',
          dataIndex: 'schoolType',
          key: 'schoolType',
        }
    ];

    var rootRef = firebase.database().ref('interests');
    rootRef.once('value', snapshot => {
        setData(Object.values(snapshot.val()));
    });

    return (
        <Table columns={columns} dataSource={data} />
    );
}

export default Interests;