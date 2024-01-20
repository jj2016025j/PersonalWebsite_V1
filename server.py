from flask import Flask, render_template, jsonify, request  # 导入 render_template
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5050"}})# 这将允许所有来源的跨域请求

# def open_browser():
#       webbrowser.open_new('http://127.0.0.1:5000/')

# if __name__ == '__main__':
#     # if os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
#     #     threading.Timer(0, open_browser).start()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/payFinish.html')
def pay_finish():
    return render_template('payFinish.html')

@app.route('/portfolio.html')
def portfolio():
    return render_template('portfolio.html')

@app.route('/productInfo.html')
def product_info():
    return render_template('productInfo.html')

@app.route('/shoppingCar.html')
def shopping_car():
    return render_template('shoppingCar.html')

@app.route('/shoppingCarPay.html')
def shopping_car_pay():
    return render_template('shoppingCarPay.html')

@app.route('/signup.html')
def signup():
    return render_template('signup.html')

@app.route('/store.html')
def store():
    return render_template('store.html')

@app.route('/test.html')
def test():
    return render_template('test.html')

@app.route('/tool.html')
def tool():
    return render_template('tool.html')

@app.route('/gpt.html')
def gpt():
    return render_template('gpt.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(405)
def method_not_allowed_error(error):
    return render_template('405.html'), 405

# 假設已經設置了數據庫連接
connection = pymysql.connect("localhost", "user", "password", "database")


@app.route('/api/create_database', methods=['GET'])
def get_data():
    cursor = connection.cursor()
    cursor.execute("CREATE DATABASE mydb;")
    connection.commit()   
     
    data = cursor.fetchall()
    
    # 確保關閉數據庫連接
    cursor.close()
    connection.close()

    return jsonify(data)

@app.route('/api/insertdata', methods=['GET'])
def get_data():
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", ("John Doe", "john@example.com"))
    connection.commit()   
     
    data = cursor.fetchall()
    
    # 確保關閉數據庫連接
    cursor.close()
    connection.close()

    return jsonify(data)

@app.route('/api/select_articles', methods=['GET'])
def get_articles():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM `articles` WHERE 1")
    data = cursor.fetchall()
    
    # 確保關閉數據庫連接
    cursor.close()
    connection.close()

    return jsonify(data)

@app.route('/api/select_projects', methods=['GET'])
def get_projects():
    # 添加從數據庫取得專案數據的邏輯
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM projects")

    rows = cursor.fetchall()

    for row in rows:
        print(row)
    pass

@app.route('/api/create_new_table', methods=['GET'])
def create_new_table():
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name VARCHAR(255), email VARCHAR(255));")
    data = cursor.fetchall()
    
    # 確保關閉數據庫連接
    cursor.close()
    connection.close()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True,port=5050)
    