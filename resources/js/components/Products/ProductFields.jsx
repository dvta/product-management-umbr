import {Input, Form, Select, Upload, Button, Tag} from 'antd';
import {CameraTwoTone} from "@ant-design/icons";



export default function ProductFields({productCategories, form}) {

    return (
        <>
            <Form.Item label="Name" name="name">
                <Input/>
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input/>
            </Form.Item>

            <Form.Item label="Price" name="price">
                <Input/>
            </Form.Item>

            <Form.Item label="Category" name="categories">
                <Select mode="multiple" placeholder="Please select"
                >
                    {productCategories?.map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Assigned Categories" name="assignedCategories">
                <div>
                    {form?.getFieldValue('categories')?.map((categoryId) => {
                        const category = productCategories.find((cat) => cat.id === categoryId);
                        return (
                            <Tag key={categoryId.id} closable onClose={() => form.setFieldsValue({ categories: form.getFieldValue('categories')?.filter((id) => id !== categoryId) })}>
                                {categoryId?.name}
                            </Tag>
                        );
                    })}
                </div>
            </Form.Item>


            <Form.Item label="Upload" name="images">
                <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                >
                    <Button type="button" icon={<CameraTwoTone/>} />
                </Upload>
            </Form.Item>
        </>
    );
}
