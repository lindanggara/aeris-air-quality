import React from 'react';

function CardPredict({ data }) {
  const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
    card: { backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontWeight: 'bold' },
    badgeNormal: { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontSize: '12px', padding: '3px 8px', borderRadius: '4px' },
    badgeAnomali: { backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', fontSize: '12px', padding: '3px 8px', borderRadius: '4px' },
    row: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#94a3b8' },
    value: { fontFamily: 'monospace', color: '#f8fafc' }
  };

  return (
    <div style={styles.grid}>
      {/* PAGI */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={{color: '#fbbf24'}}>☀️ Pagi (06:00)</span>
          <span style={styles.badgeNormal}>{data.pagi.status}</span>
        </div>
        <div style={styles.row}><span>PM2.5:</span><span style={styles.value}>{data.pagi.pm25} µg/m³</span></div>
        <div style={styles.row}><span>PM10:</span><span style={styles.value}>{data.pagi.pm10} µg/m³</span></div>
        <div style={styles.row}><span>CO:</span><span style={styles.value}>{data.pagi.co} ppm</span></div>
      </div>

      {/* SIANG */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={{color: '#f97316'}}>🔥 Siang (12:00)</span>
          <span style={styles.badgeAnomali}>{data.siang.status}</span>
        </div>
        <div style={styles.row}><span>PM2.5:</span><span style={{...styles.value, color: '#f43f5e'}}>{data.siang.pm25} µg/m³</span></div>
        <div style={styles.row}><span>PM10:</span><span style={styles.value}>{data.siang.pm10} µg/m³</span></div>
        <div style={styles.row}><span>CO:</span><span style={styles.value}>{data.siang.co} ppm</span></div>
      </div>

      {/* SORE/MALAM */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={{color: '#818cf8'}}>🌙 Malam (18:00)</span>
          <span style={styles.badgeNormal}>{data.sore_malam.status}</span>
        </div>
        <div style={styles.row}><span>PM2.5:</span><span style={styles.value}>{data.sore_malam.pm25} µg/m³</span></div>
        <div style={styles.row}><span>PM10:</span><span style={styles.value}>{data.sore_malam.pm10} µg/m³</span></div>
        <div style={styles.row}><span>CO:</span><span style={styles.value}>{data.sore_malam.co} ppm</span></div>
      </div>
    </div>
  );
}

export default CardPredict;