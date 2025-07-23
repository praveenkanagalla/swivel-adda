from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Initialize Flask app
app = Flask(__name__)
CORS(app)

# ✅ Get DB credentials from environment variables
db_config = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', ''),
    'database': os.environ.get('DB_NAME', 'mydatabase')
}

# ✅ Database connection function
def get_db_connection():
    return mysql.connector.connect(**db_config)

# ✅ Ensure table exists
def create_user_table():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255)
            )
        """)
        conn.commit()
    except Exception as e:
        print("Error creating table:", e)
    finally:
        conn.close()

create_user_table()

# ✅ REGISTER Endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"message": "User already exists"}), 400

        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                       (name, email, password))
        conn.commit()
        return jsonify({"message": "Registration successful"}), 200
    except Exception as e:
        return jsonify({"message": "Error registering user", "error": str(e)}), 500
    finally:
        conn.close()

# ✅ LOGIN Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"success": False, "message": "Email and password required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user or user['password'] != password:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401

        user.pop('password', None)
        return jsonify({"success": True, "user": user, "token": "token"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": "Error logging in", "error": str(e)}), 500
    finally:
        conn.close()

# ✅ Local server runner
if __name__ == '__main__':
    app.run(debug=True)
