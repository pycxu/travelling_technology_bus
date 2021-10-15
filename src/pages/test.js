import { Form, Input, Button, notification, Table } from 'antd';
import firebase from './firebase/firebase';
import { history, Link} from 'umi';
import React, { useState, useEffect } from 'react';

const Test = () => {
    const [id, setID] = useState(100)
    useEffect(() => {
        var rootRef = firebase.database().ref('test');
        rootRef.once('value', snapshot => {
            if(!snapshot.exists()) {
                rootRef.set({id: id});
            }else{
                rootRef.set({id: snapshot.val().id+1});
                setID(snapshot.val().id);
            }
        });
        
    }, [])
    

    
    return (
        <div>{id}</div>
    );
}

export default Test;