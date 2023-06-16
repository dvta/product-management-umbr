import {Button, Checkbox, Form, Input, Upload} from 'antd';
import CategoryFields from "./ProductFields.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductFields from "./ProductFields.jsx";

export default function () {
    const navigate = useNavigate();
    const [productCategories, setProductCategories] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const onFinish = (values) => {
        let formData = new FormData();

        Object.entries(values).forEach(([property, value]) => {

            if (property !== 'images') {
                formData.append(`${property}`, value || '');
            }
        });
        const onFinishFailed = (errorInfo) => {
            if (errorInfo.errorFields) {
                const errors = errorInfo.errorFields.reduce((acc, {name, errors}) => {
                    acc[name[0]] = errors;
                    return acc;
                }, {});
                setValidationErrors(errors);
            }
        };

        values?.images?.fileList?.forEach((item, index) => {
            formData.append(`images[${index}]`, item.originFileObj || '');
        });

        values?.categories?.forEach((item, index) => {
            formData.append(`categories[${index}]`, item || '');
        });


        axios.post(`/admin/api/products`, formData).then(res => {
            navigate('/admin/products')
        })
    };

    useEffect(() => {
        axios.get('/admin/api/categories').then(res => {
            setProductCategories(res.data.data)
        })
    }, [])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
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

                onFinishFailed={onFinishFailed}
                validateTrigger={['onSubmit']}
                autoComplete="off"
            >
                <ProductFields productCategories={productCategories}/>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        create
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
