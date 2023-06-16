import {Button, Checkbox, Form, Input} from 'antd';
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import ProductFields from "./ProductFields.jsx";
import categories from "../categories/Categories.jsx";

export default function () {
    const {id} = useParams();
    const [form] = Form.useForm();
    const [productCategories, setProductCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/admin/api/products/${id}`).then(res => {
            form.setFieldsValue(res.data.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/admin/api/categories').then(res => {
            setProductCategories(res.data.data)
        })
    }, [])
    const onFinish = (values) => {

        let formData = new FormData();

        Object.entries(values).forEach(([property, value]) => {

            if (property !== 'images') {
                formData.append(`${property}`, value || '');
            }
        });

        values?.images?.fileList?.forEach((item, index) => {
            formData.append(`images[${index}]`, item.originFileObj || '');
        });

        values?.categories?.forEach((item, index) => {
            formData.append(`categories[${index}]`, item || '');
        });


        formData.append("_method", "PATCH");

        axios.post(`/admin/api/products/${id}`, formData).then(res => {
            navigate('/admin/products')
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

        <ProductFields productCategories={productCategories} form={form} />
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
