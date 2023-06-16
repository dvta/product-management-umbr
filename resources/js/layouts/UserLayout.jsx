import {AppstoreOutlined, BookOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;



const rightMenu = [
    {
        key: '/products',
        label: 'Products',
        icon: React.createElement(BookOutlined),
        path: '',
    }
    ];

const items2 = rightMenu.map((item, index) => {
    const key = String(index + 1);
    return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        to: item.path,
    };
});
export default function () {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        const { target } = rightMenu.find(item => item.key === key) || {};
        if (target) {
            navigate(target);
        }
    };
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div >
                    <h4 style={{ color: 'white' }}>Task Management</h4>
                </div>

            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >

                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['/products']}
                            style={{
                                height: '100%',
                            }}
                            items={items2}
                            onClick={({key}) =>{
                                navigate(key)
                            }}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >

            </Footer>
        </Layout>
    );
};
