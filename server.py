from flask import Flask, render_template, request
from os import listdir
from os.path import isfile, join

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


def get_files():
    my_path = 'static/images/'
    files = [join(my_path, f) for f in listdir(my_path) if isfile(join(my_path, f))]
    return files


@app.route('/game')
def game():
    files = get_files()
    player_1_keys = ["Q", "W", "E", "R", "A"]
    player_2_keys = ["U", "I", "O", "P", "J"]
    difficulty = int(request.args.get('difficulty', 4))
    player_1_keys_by_difficulty = player_1_keys[:difficulty]
    player_2_keys_by_difficulty = player_2_keys[:difficulty]
    time = request.args.get('time', '00:30')
    mins = int(time[:2])
    secs = int(time[3:])
    time_in_sec = mins * 60 + secs
    player_1 = request.args.get('player_1', "Player 1")
    player_2 = request.args.get('player_2', "Player 2")
    return render_template('game.html',
                           time_in_sec=time_in_sec,
                           player_1=player_1,
                           player_2=player_2,
                           player_1_keys=player_1_keys_by_difficulty,
                           player_2_keys=player_2_keys_by_difficulty,
                           files=files)


if __name__ == '__main__':
    app.run(debug=True)
