from flask import Flask,jsonify,flash, make_response, request, get_flashed_messages , render_template ,redirect, url_for, send_file ,session,redirect,send_from_directory
import pandas as pd
import requests
import random
import os
import mysql.connector
import json
from datetime import datetime
from flask_cors import CORS



def execute_query(query, params=None, fetch=True, commit=False, many=False, filepath=None):
    config = {
        'host': '127.0.0.1',
        'user': 'bt',
        'password': 'terogmergi',
        'database': 'BancaTransilvania'
    }
    try:
        with mysql.connector.connect(**config) as connection:
            with connection.cursor(dictionary=True) as cursor:
                if filepath:
                    query = query % filepath  # Substitutes the filepath into the query

                if many:
                    cursor.executemany(query, params)
                else:
                    cursor.execute(query, params)

                results = cursor.fetchall() if fetch and not many else None
                if commit:
                    connection.commit()

                return results
    except Exception as e:
        print(f"Error: {e}")
        return None

expected_columns = {
    "Timestamp": "string",
    "From Bank": "int32",
    "Account": "string",
    "To Bank": "int32",
    "Account.1": "string",
    "Amount Received": "float",
    "Receiving Currency": "string",
    "Amount Paid": "float",
    "Payment Currency": "string",
    "Payment Format": "string",
    "Is Laundering": "bool"
}

def verify_csv_format(filepath):
    try:
        # Read the CSV file
        df = pd.read_csv(filepath)
        # Verify column names
        if list(expected_columns.keys()) != df.columns.tolist():
            return 400, "Column names do not match expected names."
        
        # Verify data types
        for column, expected_dtype in expected_columns.items():
            if df[column].dtype != expected_dtype:
                try:
                    df[column] = df[column].astype(expected_dtype)
                except Exception as e:
                    return 400, f"Data type conversion failed for column: {column} ({e})"
        results = send_csv_to_api(filepath,"http://127.0.0.1:6969/predict")
        df['Is Laundering'] = pd.Series(results['predictions'])
        df['Probability'] = pd.Series(format(float(results['probabilities']), ".2f"))
    
        df.to_csv(filepath, index=False) 
        # Assuming data validation passes, delete previous data and load new data
        delete_query = "DELETE FROM Transactions"
        execute_query(query=delete_query, commit=True)
        
        # Load CSV data into the database
        load_data_query = """
        LOAD DATA INFILE '%s'
        INTO TABLE Transactions
        FIELDS TERMINATED BY ','
        OPTIONALLY ENCLOSED BY '"'
        LINES TERMINATED BY '\\n'
        IGNORE 1 LINES
        (
            @Timestamp,
            @From_Bank,
            @Account,
            @To_Bank,
            @Account_1,
            @Amount_Received,
            @Receiving_Currency,
            @Amount_Paid,
            @Payment_Currency,
            @Payment_Format,
            @Is_Laundering,
            @Probability
        )
        SET
        Timestamp = @Timestamp,
        From_Bank = @From_Bank,
        Account = @Account,
        To_Bank = @To_Bank,
        Account_1 = @Account_1,
        Amount_Received = @Amount_Received,
        Receiving_Currency = @Receiving_Currency,
        Amount_Paid = @Amount_Paid,
        Payment_Currency = @Payment_Currency,
        Payment_Format = @Payment_Format,
        Is_Laundering = @Is_Laundering,
        Probability= @Probability;

        """        
        
        execute_query(load_data_query, commit=True, fetch=False, filepath=filepath)
        
        return 200, "CSV format is correct and data loaded successfully."
    except Exception as e:
        return 400, f"Error reading or processing CSV file: {e}"

# Example usage:
# filepath = "path/to/your/data.csv"
# success, message = verify_csv_format(filepath)
# print(message)


characters='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNNM1234567890'
            
def send_csv_to_api(file_path, url):
    # Open the file in binary mode
    with open(file_path, 'rb') as file:
        files = {'file': (file_path, file, 'text/csv')}
        
        # Post the file using multipart/form-data
        response = requests.post(url, files=files)
        
        # Check the response
        if response.status_code == 200:
            print("File sent successfully.")
            return response.json()  # Assuming the response is JSON
        else:
            print("Failed to send file.")
            return response.text
        


app = Flask(__name__)
# Enable CORS globally
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers=[
    'Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Headers', 'Origin', 'Accept'])

@app.route('/',methods=['GET'])
def main():
    return render_template('upload.html')


@app.route('/upload-csv',methods=['POST'])
def upload():
    
    print("trying to upload file")
    csv_file= request.files['csvFile']
    if  csv_file.filename == '':
          return 'No selected file'
        
    if csv_file and  csv_file.content_type == 'text/csv':
        # You can save the file or process it here
        
        new_name = ''.join(random.choice(characters) for _ in range(17))
        file_extension = os.path.splitext(csv_file.filename)[-1]
        folder = 'data' + '/'
        fileName = new_name + file_extension
        complete_file_path = os.path.join('/lib/mysql/'+folder, fileName)
        csv_file.save(complete_file_path)
        print(complete_file_path)
        status_code, message = verify_csv_format(complete_file_path)
        return make_response(jsonify(message), status_code)
    return 'File is not CSV'

@app.route('/transactions',methods=['GET'])
def transactions():
    page_itteration = request.args.get('page', '1')
    query = f'SELECT * FROM Transactions LIMIT 20 OFFSET {(int(page_itteration)-1)*20}'
    transactions = execute_query(query=query)
    query='SELECT COUNT(*) FROM Transactions'
    total_transactions = execute_query(query=query)
    total_transactions= total_transactions[0]['COUNT(*)']
    data = {
    "meta": {
        "total": total_transactions,
        "from": (((int(page_itteration)-1)*20)+1),
        "to": (int(page_itteration) * 20)
    },
    "transactions": transactions  # Assuming transactions is a list
     }

    transactions = jsonify(data)
    return transactions

@app.route('/transactions/<transaction_id>',methods=['GET'])
def transactions_by_id(transaction_id):
    query = f'SELECT * FROM Transactions WHERE id={int(transaction_id)} '
    transactions = execute_query(query=query)
    transactions = jsonify(transactions)
    return transactions

@app.route('/user-transactions/<account_id>',methods=['GET'])
def transactions_by_account(account_id):
    page_itteration = request.args.get('page', '1')
    query = f'SELECT * FROM Transactions WHERE Account="{account_id}" OR Account_1="{account_id}" LIMIT 20 OFFSET {(int(page_itteration)-1)*20}'
    transactions = execute_query(query=query)
    transactions = jsonify(transactions)
    return transactions

@app.route('/transaction-stats',methods=['GET'])
def transactions_stats():
    query = f'SELECT COUNT(*) FROM Transactions WHERE Is_Laundering=0'
    ok_transactions = execute_query(query=query)
    ok_transactions=ok_transactions[0]['COUNT(*)']
    query = f'SELECT COUNT(*) FROM Transactions WHERE Is_Laundering=1'
    ml_transactions = execute_query(query=query)
    ml_transactions=ml_transactions[0]['COUNT(*)']
    data = {
    "ok": ok_transactions,
    "ml": ml_transactions}


    json_payload = jsonify(data)
    return json_payload




if __name__ == "__main__":
    app.run('0.0.0.0',7893)

 
