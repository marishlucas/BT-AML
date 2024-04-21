from flask import Flask, request, jsonify
from catboost import CatBoostClassifier
import pandas as pd

app = Flask(__name__)

# Load the CatBoost model
model = CatBoostClassifier()
model.load_model('./cat_model.cbm')

categorical_cols = ['From Bank', 'Account', 'To Bank', 'Account.1', 'Receiving Currency', 'Payment Currency', 'Payment Format']
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    try:
        data = pd.read_csv(file)
        # Preprocess data as required, similarly to how it was preprocessed before training
        data[categorical_cols] = data[categorical_cols].astype(str)
        data['Timestamp'] = pd.to_datetime(data['Timestamp']).astype('int64') // 10**9
        features = data.drop('Is Laundering', axis=1)

        predictions = model.predict(features)
        probabilities = model.predict_proba(features)[:, 1]

        return jsonify({
            'predictions': predictions.tolist(),
            'probabilities': probabilities.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run('127.0.0.1',6969, debug=True)