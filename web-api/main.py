from urllib import request
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import random
import json

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})
@app.route('/')
def index():
    return 'Hello!'

@app.route('/test')
def getRandomPokemon():
    temp = dict()
    for i in range(0, 3):
        request = requests.get('https://pokeapi.co/api/v2/pokemon/' + str(random.randint(1,898)))
        app.logger.debug(request.json()['name'])
        app.logger.debug(request.json()['sprites']['front_default'])
        temp['name'] = request.json()['name']
        temp['sprites'] = request.json()['sprites']['front_default']

    app.logger.info("temp", temp)
    print(temp)
   # request_one = requests.get('https://pokeapi.co/api/v2/pokemon/' + str(random.randint(1,898)))
   # request_two = requests.get('https://pokeapi.co/api/v2/pokemon/' + str(random.randint(1,898)))
    #request_three = requests.get('https://pokeapi.co/api/v2/pokemon/' + str(random.randint(1,898)))
    #app.logger.info('testing info log')
   # app.logger.debug(request_one.json()['sprites']['front_default'])
   # app.logger.debug(request_two.json()['sprites']['front_default'])
    #app.logger.debug(request_three.json()['sprites']['front_default'])

    return json.dumps(temp)

if __name__ == '__main__':
    app.run(debug=True)