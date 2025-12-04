// import { useNavigate } from "react-router-dom";
import { CalendarPicker, List, CapsuleTabs, Picker, Empty, Switch } from 'antd-mobile';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { QuestionCircleOutline, RightOutline, LeftOutline } from 'antd-mobile-icons';
import './index.css';

function Calendar() {
  const [visibleDay, setVisibleDay] = useState(false);

  // 月/年 Picker 状态
  const [visibleMonthPicker, setVisibleMonthPicker] = useState(false);
  const [visibleYearPicker, setVisibleYearPicker] = useState(false);
  const now = new Date();
  const [monthValue, setMonthValue] = useState([`${now.getFullYear()}`, `${now.getMonth() + 1}`]); // [year, month]
  const [yearValue, setYearValue] = useState([`${now.getFullYear()}`]); // [year]

  const [activeKey, setActiveKey] = useState('day');

  // 生成年份数组（例如 2000-2030）
  const years = Array.from({ length: 31 }, (_, i) => {
    const y = 2000 + i;
    return { label: `${y}年`, value: `${y}` };
  });
  const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: `${i + 1}` }));

  return (
    <div>
      <CapsuleTabs
        defaultActiveKey="day"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
      >
        <CapsuleTabs.Tab title="日" key="day" />
        <CapsuleTabs.Tab title="月" key="month" />
        <CapsuleTabs.Tab title="年" key="year" />
      </CapsuleTabs>

      <List header="日期选择">
        {activeKey === 'day' && (
          <List.Item onClick={() => setVisibleDay(true)}>
            选择日期
            <CalendarPicker
              visible={visibleDay}
              selectionMode="single"
              defaultValue={new Date()}
              onConfirm={(v) => {
                const fmt = Array.isArray(v)
                  ? v.map((d) => dayjs(d).format('YYYY-MM-DD HH:mm:ss'))
                  : dayjs(v).format('YYYY-MM-DD HH:mm:ss');
                console.log('day pick', fmt);
              }}
              onClose={() => setVisibleDay(false)}
              onMaskClick={() => setVisibleDay(false)}
            />
          </List.Item>
        )}

        {activeKey === 'month' && (
          <List.Item onClick={() => setVisibleMonthPicker(true)}>
            选择年+月
            <Picker
              columns={[years, months]}
              visible={visibleMonthPicker}
              value={monthValue}
              onClose={() => setVisibleMonthPicker(false)}
              onConfirm={(v) => {
                setMonthValue(v);
                console.log('month pick', v); // v => ['2025','6']
                setVisibleMonthPicker(false);
              }}
            />
          </List.Item>
        )}

        {activeKey === 'year' && (
          <List.Item onClick={() => setVisibleYearPicker(true)}>
            选择年份
            <Picker
              columns={[years]}
              visible={visibleYearPicker}
              value={yearValue}
              onClose={() => setVisibleYearPicker(false)}
              onConfirm={(v) => {
                setYearValue(v);
                console.log('year pick', v); // v => ['2025']
                setVisibleYearPicker(false);
              }}
            />
          </List.Item>
        )}
      </List>
    </div>
  );
}
function getTimePeriod() {
  const now = new Date();
  const hour = now.getHours(); // 获取小时数（0-23）

  if (hour >= 0 && hour < 6) {
    return '凌晨';
  } else if (hour >= 6 && hour < 12) {
    return '上午';
  } else if (hour >= 12 && hour < 18) {
    return '下午';
  } else if (hour >= 18 && hour < 24) {
    return '晚上';
  }
}
function Card() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="card">
      <div className="card-header">
        {checked && (
          <h1 className="card-title">
            月支出
            <RightOutline />
          </h1>
        )}

        {!checked && (
          <h1 className="card-title">
            月收入
            <LeftOutline />
          </h1>
        )}

        <Switch
          defaultChecked
          onChange={(checked) => {
            setChecked(checked);
          }}
          className="toggle-switch"
        />
      </div>
      <div className="card-body">
        <h2 className="card-total">¥0.00</h2>
        <h3 className="card-sub">
          <span>月收入￥：</span>
          <span>月结余￥：</span>
        </h3>
      </div>
    </div>
  );
}
const Index = () => {
  const [DataList, setDataList] = useState([
    {
      date: '2025-12-02',
      week: '星期二',
      totalIncome: 10,
      totalExpense: 20,
      bills: [
        { icon: 'fas fa-utensils', category: '餐饮', amount: 20, type: 'expense' },
        { icon: 'fas fa-truck', category: '中奖', amount: 10, type: 'income' },
      ],
    },
    {
      date: '2025-12-01',
      week: '星期一',
      totalIncome: 0,
      totalExpense: 20,
      bills: [{ icon: 'fas fa-shopping-bag', category: '购物', amount: 20, type: 'expense' }],
    },
    {
      date: '2025-11-30',
      week: '星期日',
      totalIncome: 5000,
      totalExpense: 300,
      bills: [
        { icon: 'fas fa-money-bill-wave', category: '工资', amount: 5000, type: 'income' },
        { icon: 'fas fa-bus', category: '交通', amount: 20, type: 'expense' },
        { icon: 'fas fa-home', category: '房租', amount: 280, type: 'expense' },
      ],
    },
  ]);

  return (
    <div>
      <h1>Hi, {getTimePeriod()}好</h1>
      <Calendar />
      <Card />

      {DataList.length === 0 ? (
        <Empty
          className="empty"
          image={<QuestionCircleOutline className="empty-icon" />}
          description="暂无数据"
        />
      ) : (
        <div className="data-list">
          {DataList.map((item) => (
            <div key={item.date} className="day-item">
              <div className="day-header">
                <div>
                  <div className="day-date">{item.date}</div>
                  <div className="day-week">{item.week}</div>
                </div>
                <div className="day-right">
                  <div>
                    收入：<span className="income-text">¥{item.totalIncome}</span>
                  </div>
                  <div>
                    支出：<span className="expense-text">¥{item.totalExpense}</span>
                  </div>
                </div>
              </div>

              {item.bills && item.bills.length > 0 && (
                <div className="bills">
                  {item.bills.map((b, idx) => (
                    <div key={`${item.date}-${idx}`} className="bill">
                      <div className="bill-left">
                        <i className={`bill-icon ${b.icon}`} aria-hidden="true" />
                        <div className="bill-meta">
                          <div className="bill-category">{b.category}</div>
                          <div className="bill-type">{b.type === 'income' ? '收入' : '支出'}</div>
                        </div>
                      </div>
                      <div className={`amount ${b.type === 'income' ? 'income' : 'expense'}`}>
                        {b.type === 'income' ? '+' : '-'}¥{b.amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Index;
