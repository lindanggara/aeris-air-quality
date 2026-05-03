import pandas as pd
import psycopg2
import os
from dotenv import load_dotenv
from psycopg2 import extras

# Load kredensial dari file .env
load_dotenv()

def connect_db():
    """Fungsi untuk melakukan koneksi ke PostgreSQL"""
    try:
        connection = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
        return connection
    except Exception as error:
        print(f"Error koneksi DB: {error}")
        return None


def insert_csv_to_db(file_path):
    """Membaca CSV hasil kerja Linda dan memasukkannya ke database"""
    # 1. Cek apakah file CSV ada
    if not os.path.exists(file_path):
        print(f"File {file_path} tidak ditemukan! Pastikan Linda sudah menjalankan notebook-nya.")
        return

    # 2. Baca CSV menggunakan Pandas
    df = pd.read_csv(file_path)
    
    # 3. Sesuaikan urutan kolom dengan skema tabel air_quality_raw
    # Kita asumsikan city_id untuk Surabaya adalah 1 (sesuai insert manual kamu)
    df['city_id'] = 1
    
    # Pilih kolom yang sesuai dengan tabel DB (pm25, pm10, co, no2, o3, temp, humidity, time)
    # Linda menggunakan nama: time, pm25, pm10, co, no2, o3, temperature_2m, relative_humidity
    data_to_insert = df[['city_id', 'pm25', 'pm10', 'co', 'no2', 'o3', 'temperature_2m', 'relative_humidity', 'time']]

    # 4. Koneksi dan Insert
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        
        # Query SQL Insert
        query = """
            INSERT INTO air_quality_raw 
            (city_id, pm25, pm10, co, no2, o3, temperature, humidity, timestamp) 
            VALUES %s
        """
        
        # Konversi dataframe ke list of tuples untuk batch insert agar cepat
        tuples = [tuple(x) for x in data_to_insert.to_numpy()]
        
        try:
            extras.execute_values(cursor, query, tuples)
            conn.commit()
            print(f"✅ Berhasil memasukkan {len(df)} baris data ke database.")
        except Exception as e:
            print(f"❌ Gagal melakukan insert: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    # Jalankan validasi fetch manual
    path_csv_linda = "data/raw/surabaya_airquality_raw.csv"
    insert_csv_to_db(path_csv_linda)