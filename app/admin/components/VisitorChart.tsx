/**
 * VisitorChart Component
 * 
 * Component hiển thị biểu đồ lượng truy cập website 30 ngày gần nhất
 * 
 * Features:
 * - Hybrid chart: Bar chart (số lượng khách) + 2 line charts (tăng giảm, trung bình)
 * - Dual Y-axes: left (số khách), right (biến động ngày)
 * - Mock data generation với delay 800ms để simulate loading
 * - Responsive design với ChartJS
 * - Custom tooltip và legend
 * - Gradient fill cho bar chart
 * 
 * Chart layers:
 * 1. Bar (green gradient) - Số lượng khách truy cập hàng ngày
 * 2. Line (yellow dashed) - Đường trung bình
 * 3. Line (blue) - Biến động so với ngày hôm trước
 * 
 * @component Client Component
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { generateVisitorData } from '../utils/chartUtils';
import '../styles/visitor-chart.css';

// Đăng ký các thành phần Chart.js cần thiết
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function VisitorChart() {
    const [chartData, setChartData] = useState<{ labels: string[], data: number[] } | null>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        // Mô phỏng tải dữ liệu
        const timer = setTimeout(() => {
            setChartData(generateVisitorData(30));
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Tính toán giắ trị trung bình
    const averageVisitors = chartData?.data
        ? Math.round(chartData.data.reduce((a, b) => a + b, 0) / chartData.data.length)
        : 0;

    // Tính toán sự tăng giảm so với ngày hôm trước
    const dailyChange = chartData?.data.map((val, i, arr) => {
        if (i === 0) return 0;
        return val - arr[i - 1];
    }) || [];

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1B5E20',
                bodyColor: '#4a5568',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        const prefix = value > 0 && label.includes('Tăng giảm') ? '+' : '';
                        return `${label}: ${prefix}${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    color: '#718096'
                }
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                border: {
                    display: false
                },
                grid: {
                    color: '#cbd5e1', // Màu xám đậm hơn (tương đương gray-300)
                    lineWidth: 1.2,    // Làm nét vẽ dày hơn một chút
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    color: '#718096',
                    callback: function (value: any) {
                        return value >= 1000 ? `${value / 1000}k` : value;
                    }
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false, // Ngăn không cho grid của y1 chồng lên y
                },
                ticks: {
                    font: {
                        size: 10
                    },
                    color: '#1565C0',
                    callback: function (value: any) {
                        return value > 0 ? `+${value}` : value;
                    }
                },
                title: {
                    display: true,
                    text: 'Biến động ngày',
                    font: {
                        size: 10
                    },
                    color: '#1565C0'
                }
            }
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
    };

    // Xây dựng dữ liệu biểu đồ
    const data = {
        labels: chartData?.labels || [],
        datasets: [
            {
                type: 'line' as const,
                label: 'Tăng giảm',
                data: dailyChange,
                borderColor: '#1565C0', // Xanh dương đậm
                borderWidth: 2,
                tension: 0.1,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#1565C0',
                pointBorderWidth: 1,
                pointRadius: 3,
                pointHoverRadius: 5,
                fill: false,
                yAxisID: 'y1', // Sử dụng trục Y bên phải
                order: 1
            },
            {
                type: 'line' as const,
                label: `Trung bình (${averageVisitors})`,
                data: chartData ? new Array(chartData.data.length).fill(averageVisitors) : [],
                borderColor: '#FFC107',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false,
                yAxisID: 'y', // Sử dụng trục Y bên trái
                order: 2
            },
            {
                type: 'bar' as const,
                label: 'Khách truy cập',
                data: chartData?.data || [],
                backgroundColor: (context: ScriptableContext<'bar'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(76, 175, 80, 0.8)');
                    gradient.addColorStop(1, 'rgba(129, 199, 132, 0.4)');
                    return gradient;
                },
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                yAxisID: 'y', // Sử dụng trục Y bên trái
                order: 3
            },
        ],
    };

    return (
        <div className="visitor-chart-card">
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">Lượng Truy Cập Website</h3>
                    <p className="chart-subtitle">Thống kê 30 ngày gần nhất</p>
                </div>
                {/* Tùy chọn: Thêm bộ lọc dropdown ở đây */}
            </div>

            <div className="chart-container">
                {chartData ? (
                    <Chart
                        type='bar'
                        ref={chartRef}
                        options={options}
                        data={data}
                    />
                ) : (
                    <div className="chart-skeleton"></div>
                )}
            </div>
        </div>
    );
}
