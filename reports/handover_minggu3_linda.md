# Handover Doc – Minggu 3 | Linda Anggara Wati

**Tanggal:** 18 May 2026  
**Proyek:** Sistem Deteksi Anomali Kualitas Udara – Kelompok Aeris PENS 2026

---

## Tabel Rekap 15 Model (5 Polutan x 3 Segmen)

| Parameter | Segmen | Model Terbaik | MAE | RMSE | R2 |
|:---:|:---:|:---|:---:|:---:|:---:|
| PM25 | PAGI | BayesianRidge | 0.7997 | 1.0419 | 0.9979 |
| PM10 | PAGI | BayesianRidge | 0.8276 | 1.0697 | 0.9978 |
| CO | PAGI | LGBMRegressor | 0.2074 | 0.2843 | 0.7582 |
| NO2 | PAGI | LGBMRegressor | 4.2378 | 6.3573 | 0.8460 |
| O3 | PAGI | LGBMRegressor | 11.8563 | 14.9884 | 0.8750 |
| PM25 | SIANG | BayesianRidge | 0.3563 | 0.5219 | 0.9973 |
| PM10 | SIANG | BayesianRidge | 0.3770 | 0.5416 | 0.9972 |
| CO | SIANG | LGBMRegressor | 0.1626 | 0.2104 | 0.8288 |
| NO2 | SIANG | ExtraTreesRegressor | 3.2136 | 4.7661 | 0.7821 |
| O3 | SIANG | LGBMRegressor | 13.5881 | 18.1284 | 0.8029 |
| PM25 | SORE_MALAM | BayesianRidge | 0.5088 | 0.6522 | 0.9988 |
| PM10 | SORE_MALAM | BayesianRidge | 0.5057 | 0.6465 | 0.9989 |
| CO | SORE_MALAM | ExtraTreesRegressor | 0.3864 | 0.4817 | 0.6767 |
| NO2 | SORE_MALAM | ExtraTreesRegressor | 4.9615 | 6.6105 | 0.8118 |
| O3 | SORE_MALAM | ExtraTreesRegressor | 9.5606 | 12.6698 | 0.6729 |


## File Output

| File | Keterangan |
|---|---|
| `models/{polutan}_{segmen}_best.pkl` | 15 model tersimpan |
| `reports/rekap_15_model.csv` | Tabel rekap CSV |
| `reports/rekap_15_model.xlsx` | Tabel rekap Excel (untuk Intan) |
| `reports/viz_r2_heatmap.png` | Heatmap R2 |
| `reports/viz_mae_heatmap.png` | Heatmap MAE |
| `reports/viz_model_frekuensi.png` | Frekuensi model terbaik |
| `reports/viz_before_after_tuning.png` | Before vs After tuning |

## Cara Load Model di FastAPI (untuk Yuhanidz)

```python
from pycaret.regression import load_model, predict_model
import pandas as pd

# Load model sesuai segmen jam saat ini
model = load_model('models/pm25_pagi_best')  # tanpa .pkl

# Prediksi
df_input = pd.DataFrame([{...fitur...}])
hasil    = predict_model(model, data=df_input)
prediksi = hasil['prediction_label'].values[0]
```

## Segmentasi Waktu
- **PAGI**: jam 06:00-11:59 -> load `models/{polutan}_pagi_best.pkl`
- **SIANG**: jam 12:00-17:59 -> load `models/{polutan}_siang_best.pkl`
- **SORE_MALAM**: jam 18:00-05:59 -> load `models/{polutan}_sore_malam_best.pkl`
