import React, { useState, useEffect } from 'react';
import { Badge, TabBar, NavBar } from 'antd-mobile';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import './index.css';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
      path: '/',
    },
    {
      key: 'todo',
      title: '记账簿',
      icon: <UnorderedListOutline />,
      badge: '5',
      path: '/books',
    },
    {
      key: 'message',
      title: '统计',
      path: '/message',
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      path: '/mine',
      icon: <UserOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState('home');
  const [title, setTitle] = useState('欢迎使用记账本');
  const getActiveKeyByPath = (pathname) => {
    const matchTab = tabs.find((tab) => tab.path === pathname);
    // 匹配不到则默认返回home
    return matchTab ? matchTab.key : 'home';
  };
  useEffect(() => {
    const newActiveKey = getActiveKeyByPath(location.pathname);
    setActiveKey(newActiveKey);
  }, [location.pathname]); // 依赖路由路径变化
  function TabarClick(item) {
    console.log('tabar click', item, location);
    if (location.pathname === item.path) {
      window.location.reload();
    } else {
      navigate(item.path || '/');
    }
    if (item.key === 'home') {
      setTitle('欢迎使用记账本');
    } else if (item.key === 'todo') {
      setTitle('记账簿');
    } else if (item.key === 'message') {
      setTitle('支出分析');
    } else if (item.key === 'personalCenter') {
      setTitle('个人中心');
    }
  }
  return (
    <>
      <div className="app">
        <NavBar backIcon={false}>{title}</NavBar>
        <Outlet />
        <TabBar className="bottom" activeKey={activeKey} onChange={setActiveKey}>
          {tabs.map((item) => (
            <TabBar.Item
              onClick={() => TabarClick(item)}
              key={item.key}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </TabBar>
      </div>
    </>
  );
};

export default Layout;
