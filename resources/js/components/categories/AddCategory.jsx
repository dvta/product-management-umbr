import {Button, Checkbox, Form, Input} from 'antd';
import CategoryFields from "./CategoryFields.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function () {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        axios.post(`/admin/api/categories`, values).then(res => {
            navigate('/categories')
        })
    };


    return <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}

        onFinish={onFinish}

        validateTrigger={['onSubmit']}
        autoComplete="off"
    >
        <CategoryFields/>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}
