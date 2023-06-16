import {Button, Checkbox, Form, Input} from 'antd';
import CategoryFields from "./CategoryFields.jsx";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function () {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/admin/api/categories/${id}`).then(res => {
            form.setFieldsValue(res.data.data)
        })
    }, [])
    const onFinish = (values) => {
        axios.put(`/admin/api/categories/${id}`, values).then(res => {
            navigate('/admin/categories')
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
        form={form}

        onFinish={onFinish}

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
