import {Space, Table, Tag} from 'antd';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function () {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/admin/api/categories').then(res => {
            setData(res.data.data)
        })
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`${record.id}/edit`}>Edit</Link>
                </Space>
            ),
        },
    ];



    return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
}

