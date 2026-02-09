'use client';

import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateVisitorData } from '../utils/chartUtils';
import '../styles/visitor-chart.css';

// Đăng ký các thành phần Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1B5E20',
                bodyColor: '#4a5568',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return `Visitors: ${context.parsed.y}`;
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
                border: {
                    display: false
                },
                grid: {
                    color: '#f1f5f9',
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
                label: 'Visitors',
                data: chartData?.data || [],
                borderColor: '#2E7D32', // Xanh lá chủ đạo
                tension: 0, // Đường thẳng
                borderJoinStyle: 'miter' as const,
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(46, 125, 50, 0.2)'); // Xanh lá có độ trong suốt
                    gradient.addColorStop(1, 'rgba(46, 125, 50, 0)');
                    return gradient;
                },
                fill: true,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#2E7D32',
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#2E7D32',
                pointHoverBorderColor: '#FFFFFF',
                pointHoverBorderWidth: 2,
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
                    <Line
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
