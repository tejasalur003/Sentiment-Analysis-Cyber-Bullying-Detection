from flask import Flask, jsonify
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React to access Flask API

@app.route('/members', methods=['GET'])
def get_members():
    return jsonify({"members": ["Alice", "Bob", "Charlie"]})  # Example JSON





@app.route('/multiply', methods=['POST'])
def multiply_numbers():
    try:
        data = request.json
        num1 = data.get("num1")
        num2 = data.get("num2")

        if num1 is None or num2 is None:
            return jsonify({"error": "Both numbers are required"}), 400

        product = num1 * num2
        return jsonify({"product": product})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
