from flask import Flask, jsonify
from src.data.db_utils import execute_query

app = Flask(__name__)

def get_ispu_category(val):
    if val <= 50: return "Baik"
    elif val <= 100: return "Sedang"
    elif val <= 200: return "Tidak Sehat"
    else: return "Sangat Tidak Sehat"

@app.route('/ispu/surabaya', methods=['GET'])
def get_current_ispu():
    # Ambil semua polutan terbaru
    query = "SELECT pm25, pm10, co, no2, o3, timestamp FROM air_quality_raw ORDER BY timestamp DESC LIMIT 5"
    row = execute_query(query, fetch=True)
    
    if row:
        # Mengikuti logika: ISPU adalah nilai polutan yang paling menonjol
        # (Sederhananya kita tampilkan semua datanya)
        res = row[0]
        max_val = max(res[0], res[1]) # Contoh sederhana pembanding PM2.5 & PM10
        
        return jsonify({
            "status": "success",
            "location": "Surabaya",
            "timestamp": res[5],
            "pollutants": {
                "pm25": res[0],
                "pm10": res[1],
                "co": res[2],
                "no2": res[3],
                "o3": res[4]
            },
            "category": get_ispu_category(max_val)
        })
    return jsonify({"status": "error", "message": "No data found"}), 404

if __name__ == "__main__":
    app.run(port=5000)