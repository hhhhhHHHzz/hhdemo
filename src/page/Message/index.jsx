import React, { useState, useEffect, useRef } from 'react';
import { NavBar, List, Card } from 'antd-mobile';
import * as echarts from 'echarts';
import './index.css';

// 模拟数据（不变）
const mockExpenseData = {
  '2025-08': {
    categories: [
      { name: '餐饮', value: 1250.5, color: '#FFE898' },
      { name: '交通', value: 380, color: '#FFD86F' },
      { name: '购物', value: 890, color: '#FFC745' },
      { name: '娱乐', value: 450, color: '#FFB61A' },
      { name: '其他', value: 280, color: '#E69C00' },
    ],
    total: 3250.5,
    details: [
      { id: 1, time: '08-05', category: '餐饮', amount: 89, remark: '午餐' },
      { id: 2, time: '08-10', category: '购物', amount: 599, remark: '衣服' },
      { id: 3, time: '08-15', category: '交通', amount: 120, remark: '打车' },
      { id: 4, time: '08-20', category: '娱乐', amount: 200, remark: '电影+奶茶' },
      { id: 5, time: '08-25', category: '其他', amount: 150, remark: '水电费' },
    ]
  },
  // 其他月份数据省略...
};

const months = ['2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08'];

const ExpenseAnalysisPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  const [currentData, setCurrentData] = useState(mockExpenseData['2025-08']);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  // 图表初始化（不变，确保容错）
  useEffect(() => {
    const data = mockExpenseData[selectedMonth];
    if (!data) {
      setCurrentData({ categories: [], total: 0, details: [] });
      return;
    }
    setCurrentData(data);

    if (!pieChartRef.current || !barChartRef.current) return;

    // 饼图初始化
    let pieChart;
    try {
      pieChart = echarts.getInstanceByDom(pieChartRef.current) || echarts.init(pieChartRef.current);
      pieChart.setOption({
        color: data.categories.map(c => c.color),
        tooltip: { trigger: 'item', formatter: '{b}: ¥{c} ({d}%)' },
        legend: { orient: 'horizontal', bottom: 0, textStyle: { color: '#8B7338' } },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          data: data.categories.map(item => ({ name: item.name, value: item.value })),
          itemStyle: { borderRadius: 8, borderColor: '#FFF9E8', borderWidth: 2 }
        }]
      });
    } catch (e) {
      console.error('饼图初始化失败:', e);
    }

    // 柱状图初始化
    let barChart;
    try {
      barChart = echarts.getInstanceByDom(barChartRef.current) || echarts.init(barChartRef.current);
      barChart.setOption({
        tooltip: { trigger: 'axis', formatter: '{b}: ¥{c}' },
        xAxis: { type: 'category', data: months.map(m => m.slice(5)) },
        yAxis: { type: 'value', name: '金额（¥）' },
        series: [{
          type: 'bar',
          data: months.map(m => mockExpenseData[m]?.total || 0),
          itemStyle: { color: '#FFE898' }
        }]
      });
    } catch (e) {
      console.error('柱状图初始化失败:', e);
    }

    const resize = () => {
      pieChart?.resize();
      barChart?.resize();
    };
    window.addEventListener('resize', resize);
    return () => {
      pieChart?.dispose();
      barChart?.dispose();
      window.removeEventListener('resize', resize);
    };
  }, [selectedMonth]);


  return (
    <div className="expense-analysis-page">

      {/* 图表区域（确保容器有高度） */}
      <div className="charts-container">
        <Card style={{ padding: '16px' }}>
          <div style={{ fontSize: '16px', marginBottom: '12px', color: '#8B7338' }}>
            支出分类占比
          </div>
          <div 
            ref={pieChartRef} 
            style={{ width: '100%', height: '300px' }} // 必须指定高度，否则图表不显示
          />
        </Card>

        <Card style={{ padding: '16px' }}>
          <div style={{ fontSize: '16px', marginBottom: '12px', color: '#8B7338' }}>
            近6个月支出趋势
          </div>
          <div 
            ref={barChartRef} 
            style={{ width: '100%', height: '300px' }} // 必须指定高度
          />
        </Card>
      </div>

      {/* 明细区域 */}
      <div style={{ padding: '16px' }}>
        <h3 style={{ color: '#8B7338', marginBottom: '12px' }}>本月支出明细</h3>
        {currentData.details.length > 0 ? (
          <List>
            {currentData.details.map(item => (
              <List.Item key={item.id}>
                <div style={{ flex: 1 }}>{item.time}</div>
                <div style={{ flex: 1 }}>{item.category}</div>
                <div style={{ flex: 1, color: '#E69C00' }}>¥{item.amount}</div>
                <div style={{ flex: 2 }}>{item.remark}</div>
              </List.Item>
            ))}
          </List>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px', color: '#8B7338' }}>
            暂无支出明细
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseAnalysisPage;