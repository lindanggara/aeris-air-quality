from flask import Flask, jsonify
from src.data.db_utils import execute_query

app = Flask(__name__)

@app.route('/ispu/surabaya', methods=['GET'])
def get_current_ispu():
    # Mengambil data terbaru yang sudah masuk ke DB
    query = "SELECT pm25, pm10, timestamp FROM air_quality_raw ORDER BY timestamp DESC LIMIT 1"
    row = execute_query(query, fetch=True)
    
    if row:
        return jsonify({
            "status": "success",
            "data": {
                "pm25": row[0][0],
                "pm10": row[0][1],
                "timestamp": row[0][2]
            }
        })
    return jsonify({"status": "error", "message": "No data found"}), 404

if __name__ == "__main__":
    app.run(port=5000)