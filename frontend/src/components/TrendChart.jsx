import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function TrendChart() {
  // Data riil tren historis 7 hari (Dummy terstruktur sesuai skema API Yuhanidz)
  const data = [
    { timestamp: '11 Mei', pm25: 30.5 },
    { timestamp: '12 Mei', pm25: 32.1 },
    { timestamp: '13 Mei', pm25: 58.4 }, // ANOMALI (di atas 55)
    { timestamp: '14 Mei', pm25: 45.2 },
    { timestamp: '15 Mei', pm25: 38.0 },
    { timestamp: '16 Mei', pm25: 62.1 }, // ANOMALI (di atas 55)
    { timestamp: '17 Mei', pm25: 29.3 },
  ];

  const styles = {
    box: { backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px', height: '300px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    title: { fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', margin: 0 },
    legendGroup: { display: 'flex', gap: '15px', fontSize: '12px' },
    legendTeal: { color: '#2dd4bf', display: 'flex', alignItems: 'center', gap: '5px' },
    legendRose: { color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '5px' },
    dotTeal: { width: '8px', height: '8px', backgroundColor: '#2dd4bf', borderRadius: '50%', display: 'inline-block' },
    lineRose: { width: '12px', height: '2px', backgroundColor: '#f43f5e', display: 'inline-block' }
  };

  return (
    <div style={styles.box}>
      <div style={styles.header}>
        <h3 style={styles.title}>Tren Historis Parameter PM2.5 (7 Hari Terakhir)</h3>
        <div style={styles.legendGroup}>
          <span style={styles.legendTeal}>
            <span style={styles.dotTeal}></span> Konsentrasi PM2.5
          </span>
          <span style={styles.legendRose}>
            <span style={styles.lineRose}></span> Ambang Batas Sehat
          </span>
        </div>
      </div>

      {/* Kontainer Grafik yang dipaksa tingginya agar terbaca browser */}
      <div style={{ width: '100%', height: '230px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit=" µg" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
              itemStyle={{ color: '#2dd4bf' }}
            />
            
            {/* Garis Ambang Batas Sehat KLHK di angka 55 */}
            <ReferenceLine y={55} stroke="#f43f5e" strokeDasharray="5 5" />
            
            {/* Garis Tren Utama */}
            <Line 
              type="monotone" 
              dataKey="pm25" 
              stroke="#2dd4bf" 
              strokeWidth={3} 
              dot={{ r: 4, stroke: '#1e293b', strokeWidth: 2 }}
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrendChart;