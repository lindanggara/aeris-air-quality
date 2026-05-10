import logging
import requests
from apscheduler.schedulers.blocking import BlockingScheduler
from db_utils import execute_query

# Setup Logging
logging.basicConfig(filename='reports/ingestion.log', level=logging.INFO, 
                    format='%(asctime)s - %(message)s')

def fetch_realtime_data():
    logging.info("Memulai fetch data...")
    # Koordinat Surabaya
    url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-7.2575&longitude=112.7521&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone"
    
    try:
        r = requests.get(url)
        data = r.json()['current']
        ts = data['time']
        
        # Cek Duplikat
        exists = execute_query("SELECT id FROM air_quality_raw WHERE timestamp = %s", (ts,), fetch=True)
        
        if not exists:
            query = """INSERT INTO air_quality_raw (city_id, pm25, pm10, co, no2, o3, timestamp) 
                       VALUES (1, %s, %s, %s, %s, %s, %s)"""
            params = (data['pm2_5'], data['pm10'], data['carbon_monoxide'], data['nitrogen_dioxide'], data['ozone'], ts)
            execute_query(query, params)
            logging.info(f"Berhasil simpan data timestamp: {ts}")
        else:
            logging.info(f"Data {ts} sudah ada, skip insert.")
            
    except Exception as e:
        logging.error(f"Gagal fetch: {e}")

if __name__ == "__main__":
    scheduler = BlockingScheduler()
    # Jalankan tiap 1 jam
    scheduler.add_job(fetch_realtime_data, 'interval', hours=1)
    
    # Jalankan sekali saat startup
    fetch_realtime_data()
    
    print("Ingestion service running... Press Ctrl+C to exit.")
    scheduler.start()