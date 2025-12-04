import React, { useState } from 'react';
import { Avatar } from 'antd-mobile';
import {
  EditFill,
  CheckShieldFill,
  QuestionCircleFill,
  InformationCircleFill,
} from 'antd-mobile-icons';
import './index.css';

const Mine = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '张三',
  });

  // 封装cell数据，便于维护
  const cellList = [
    { title: '切换语言', icon: <EditFill />, key: 'language' },
    { title: '清除缓存', icon: <CheckShieldFill />, key: 'cache' },
    { title: '关于我们', icon: <QuestionCircleFill />, key: 'about' },
    { title: '版本信息', icon: <InformationCircleFill />, key: 'version' },
  ];

  return (
    <div className='mine'>
      {/* 个人信息区域 */}
      <div className='user-info'>
        <Avatar
          className="avatar"
          src={
            'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
        />
        <div className='user-name-wrap'>
          <h1 className='nickname'>{userInfo.nickname}</h1>
          <p className='desc'>账号ID：123456789</p> {/* 补充辅助信息，提升完整度 */}
        </div>
      </div>

      {/* 功能列表区域 */}
      <div className='cell-container'>
        {cellList.map((item, index) => (
          <div 
            key={item.key} 
            className={`cell-row ${index === cellList.length - 1 ? 'last-row' : ''}`}
          >
            <div className='row-left'>
              <span className='row-icon'>{item.icon}</span>
              <span className='row-title'>{item.title}</span>
            </div>
            {/* <ArrowRightOutline className='row-arrow' /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mine;