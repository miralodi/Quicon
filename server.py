from flask import Flask, render_template, request
from os import listdir
from os.path import isfile, join

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


def getFiles():
    mypath = 'static/images/'
    files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    result = []
    for file in files:
        result.append(mypath + file)
    return result


@app.route('/game')
def game():
    return render_template('game.html')


if __name__ == '__main__':
    app.run(debug=True)
