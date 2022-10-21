from flask import Flask, request, jsonify
from flask import render_template
import json


app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('ide.html')

@app.route('/executeCode', methods=['GET','POST'])
def execute():
    if request.method == 'GET':
        message = {'greeting': 'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers
    # POST request
    if request.method == 'POST':
        d = request.get_json() # parse as JSON
        user_code = json.dumps(d)

        with open('temp.py', 'w') as outfile:
            json.dump(user_code, outfile)
        return 'Sucesss', 200



if __name__ == '__main__':
    app.run(debug=True)

