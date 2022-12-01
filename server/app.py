from flask import Flask, request, jsonify
from agent import Agent
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/solve', methods=['POST'])
@cross_origin("*")
def solve():
    data = request.get_json()
    solution = Agent(data).target_list
    return jsonify(solution)

if __name__ == '__main__':
  app.run(debug=True)
