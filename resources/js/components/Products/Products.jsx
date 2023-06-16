import {Button, Slider, Space, Table, Tag} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {DeleteTwoTone, EditFilled} from "@ant-design/icons";
import queryString from 'query-string';


export default function () {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range
    const isAdminUrl = window.location.pathname.startsWith("/admin");


    useEffect(() => {
        const params = queryString.parse(window.location.search);
    }, []);
    useEffect(() => {
        axios.get('/admin/api/categories').then(res => {
            setCategories(res.data.data)
        })
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            const params = queryString.parse(window.location.search);
            const res = await axios.get(`/admin/api/products`, {
                params: {
                    ...params,
                    ...filteredInfo,
                }
            });
            setData(res.data.data);
        };

        fetchProducts();

        // Update the URL with the query parameters
        const search = queryString.stringify({...filteredInfo});
        const url = `${window.location.pathname}?${search}`;
        window.history.replaceState(null, '', url);
    }, [filteredInfo]);


    const handleDelete = (id) => {
        axios.delete(`/admin/api/products/${id}`).then(res => {
            setData(data.filter(item => item.id !== id))
        })
    }

    function handleAdd() {
        navigate('create');
    }

    const handleChange = (pagination, filters, sorter) => {
        const updatedFilters = Object.keys(filters).reduce((result, key) => {
            if (filters[key]?.length > 0) {
                result[key] = filters[key];
            }
            return result;
        }, {});

        const combinedFilters = {
            ...updatedFilters,
            ...sorter,
            priceRange, // Include the price range in the filters
        };

        setFilteredInfo(combinedFilters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns = [
        {
            key: '1',
            title: 'Image',
            render: (_, record) => (
                <Space size="middle">
                    <img src={record.images[0]?.path ?? ''} alt="" style={{width: 100}}/>
                </Space>
            ),
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            'ellipsis': true,
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            filteredValue: filteredInfo.price || null,
            filterDropdown: () => (
                <div style={{padding: 8}}>
                    <Slider
                        range
                        min={0}
                        max={100}
                        defaultValue={priceRange}
                        onChange={setPriceRange}
                        onAfterChange={handleChange}
                    />
                </div>
            ),
        },
        {
            key: 'categories[]',
            title: 'Categories',
            dataIndex: 'categories',
            filters: categories.map((category) => ({text: category.name, value: category.id})),
            filteredValue: filteredInfo.categories || null,
            render: (_, record) => (
                <>
                    {record.categories.map((category) => (
                        <Tag key={category.id} color="blue">
                            {category.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            key: '5',
            title: 'Action',
            render: (_, record) => {
                const isAdminUrl = window.location.pathname.startsWith("/admin");

                return isAdminUrl ? (
                    <Space size="middle">
                        <Link to={`${record.id}/edit`}><EditFilled/></Link>
                        <Button style={{border:length}} onClick={() => handleDelete(record.id)}><DeleteTwoTone /></Button>
                    </Space>
                ) : null;
            },
        },
    ];

    return (
        <>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                    float: 'right'
                }}
            >
                Add a row
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                onChange={handleChange}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: false,
                }}

            />
        </>
    )
}

