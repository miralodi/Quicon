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
    files = getFiles()
    player_1_keys = ["W", "S", "X", "E", "D"]
    player_2_keys = ["U", "J", "M", "I", "K"]
    difficulty = int(request.args.get('difficulty', 4))
    player_1_keys_by_difficulty = player_1_keys[:difficulty]
    player_2_keys_by_difficulty = player_2_keys[:difficulty]
    time = request.args.get('time', '0:30')
    player_1 = request.args.get('player_1', "Player 1")
    player_2 = request.args.get('player_2', "Player 2")
    return render_template('game.html',
                           time=time,
                           player_1=player_1,
                           player_2=player_2,
                           player_1_keys=player_1_keys_by_difficulty,
                           player_2_keys=player_2_keys_by_difficulty,
                           files=files)


if __name__ == '__main__':
    app.run(debug=True)
