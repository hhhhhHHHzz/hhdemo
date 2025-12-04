import { Radio, Input, NumberKeyboard } from 'antd-mobile';
import React, { useState, useCallback } from 'react';
import './index.css';

// 分类配置（精简匹配示例）
const categoryConfig = {
  expense: [
    { key: 'food', name: '餐饮' },
    { key: 'transport', name: '交通' },
    { key: 'shopping', name: '购物' },
    { key: 'entertainment', name: '娱乐' },
    { key: 'other', name: '其他' },
  ],
  income: [
    { key: 'salary', name: '工资' },
    { key: 'partTime', name: '兼职' },
    { key: 'bonus', name: '奖金' },
  ],
};

const BookkeepingPage = () => {
  // 核心状态
  const [accountType, setAccountType] = useState('expense'); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [amount, setAmount] = useState('0.00'); 
  const [remark, setRemark] = useState(''); 
  // 数字键盘核心状态（保留你指定的demo3）
  const [visible, setVisible] = useState(''); 

  // 金额格式化（适配键盘输入）
  const formatAmount = useCallback((value) => {
    if (!value || value === '.') return '0.00';
    let formatted = value.replace(/[^0-9.]/g, '');
    // 处理小数点
    if (formatted.indexOf('.') === -1) {
      formatted = formatted === '' ? '0.00' : `${formatted}.00`;
    } else {
      // 最多两位小数
      const [integer, decimal] = formatted.split('.');
      const fixedDecimal = decimal.slice(0, 2).padEnd(2, '0');
      formatted = `${integer || 0}.${fixedDecimal}`;
    }
    // 去掉开头多余的0
    if (formatted.startsWith('00') && formatted.indexOf('.') !== 1) {
      formatted = formatted.replace(/^0+/, '0');
    }
    return formatted;
  }, []);

  // 键盘输入事件（匹配NumberKeyboard）
  const handleInput = (key) => {
    // 处理自定义键 "-"（正负切换）
    if (key === '-') {
      setAmount(prev => {
        if (prev.startsWith('-')) return prev.slice(1);
        return `-${prev}`;
      });
      return;
    }
    // 普通数字/小数点输入
    const current = amount.replace('-', '').replace('0.00', '');
    const newVal = formatAmount(current + key);
    setAmount(amount.startsWith('-') ? `-${newVal}` : newVal);
  };

  // 键盘删除事件
  const handleDelete = () => {
    const current = amount.replace('-', '').replace('0.00', '');
    if (current === '') return;
    const newVal = formatAmount(current.slice(0, -1));
    setAmount(amount.startsWith('-') ? `-${newVal}` : newVal);
  };

  // 键盘关闭事件（保留你指定的onClose）
  const onClose = () => {
    setVisible('');
  };

  // 键盘确认事件（保留你指定的confirmText='确定'）
  const handleConfirm = () => {
    if (!selectedCategory) {
      alert('请选择记账分类');
      return;
    }
    alert('记账成功！');
    setVisible('');
  };

  // 点击金额区域唤起键盘
  const openKeyboard = () => {
    setVisible('demo3');
  };

  return (
    <div className="bookkeeping-page">
      {/* 3. 收支类型切换 */}
      <div className="type-switch">
        <Radio.Group
          value={accountType}
          onChange={setAccountType}
        >
          <Radio value="expense" className="type-option">支出</Radio>
          <Radio value="income" className="type-option">收入</Radio>
        </Radio.Group>
      </div>

      {/* 4. 分类选择 */}
      <div className="category-group">
        {categoryConfig[accountType].map((item) => (
          <div
            key={item.key}
            className={`category-btn ${selectedCategory === item.key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(item.key)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* 5. 金额区域（点击唤起键盘） */}
      <div className="amount-area" onClick={openKeyboard}>
        <span className="currency-sign">¥</span>
        <Input
          value={amount}
          readOnly
          className="amount-text"
          style={{ border: 'none', background: 'transparent', padding: 0 }}
        />
      </div>

      {/* 6. 备注输入框 */}
      <Input
        value={remark}
        onChange={(v) => setRemark(v)}
        placeholder="请输入备注（选填）"
        className="remark-input"
      />

      {/* 7. 再记一笔按钮 */}
      <div 
        className="re-record-btn" 
        onClick={() => {
          setSelectedCategory('');
          setAmount('0.00');
          setRemark('');
        }}
      >
        再记一笔
      </div>

      {/* ===== 恢复你指定的NumberKeyboard ===== */}
      <NumberKeyboard
        visible={visible === 'demo3'} 
        onClose={onClose}             
        onInput={handleInput}          
        onDelete={handleDelete}        
        onConfirm={handleConfirm}    
        customKey={'-'}               
        confirmText='确定'             
        randomOrder={false}           
        className="custom-keyboard"    
      />
    </div>
  );
};

export default BookkeepingPage;