import logging
import requests
from apscheduler.schedulers.blocking import BlockingScheduler
from src.data.db_utils import execute_query

# Setup Logging
logging.basicConfig(filename='reports/ingestion.log', level=logging.INFO, 
                    format='%(asctime)s - %(message)s')

def fetch_realtime_data():
    logging.info("Memulai fetch data lengkap...")
    # URL API Open-Meteo dengan parameter tambahan sesuai notebook Linda
    url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-7.2575&longitude=112.7521&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&hourly=temperature_2m,relative_humidity_2m"
    
    try:
        r = requests.get(url)
        data = r.json()
        current = data['current']
        ts = current['time']
        
        # Cek Duplikat
        exists = execute_query("SELECT id FROM air_quality_raw WHERE timestamp = %s", (ts,), fetch=True)
        
        if not exists:
            # Query INSERT mencakup semua parameter Linda
            query = """INSERT INTO air_quality_raw (city_id, pm25, pm10, co, no2, o3, timestamp) 
                       VALUES (1, %s, %s, %s, %s, %s, %s)"""
            params = (
                current['pm2_5'], 
                current['pm10'], 
                current['carbon_monoxide'], 
                current['nitrogen_dioxide'], 
                current['ozone'], 
                ts
            )
            execute_query(query, params)
            logging.info(f"Berhasil simpan data lengkap timestamp: {ts}")
        else:
            logging.info(f"Data {ts} sudah ada, skip.")
            
    except Exception as e:
        logging.error(f"Gagal fetch data lengkap: {e}")

if __name__ == "__main__":
    scheduler = BlockingScheduler()
    scheduler.add_job(fetch_realtime_data, 'interval', hours=1)
    fetch_realtime_data()
    print("Ingestion service running (All Parameters)...")
    scheduler.start()