from flask import Flask, render_template, request
from os import listdir
from os.path import isfile, join

app = Flask(__name__)


@app.route('/')
def index():
    deck_themes = get_img_dirs()
    return render_template('index.html', deck_themes=deck_themes)


def get_files(deck_theme):
    my_path = f'static/images/{deck_theme}'
    files = [join(my_path, f) for f in listdir(my_path) if isfile(join(my_path, f))]
    return files


def get_img_dirs():
    my_path = 'static/images/'
    decks_data = []
    for dir_name in listdir(my_path):
        icons = get_files(dir_name)
        icons.sort()
        first_img = icons[0]
        deck_data = {'name': dir_name, 'img': first_img}
        decks_data.append(deck_data)
    return decks_data


@app.route('/game', methods=['POST', 'GET'])
def game():
    deck_themes = request.form.getlist('deck_theme')
    if not deck_themes:
        deck_themes = [d for d in listdir('static/images/')]

    files = []
    for deck_theme in deck_themes:
        img_list = get_files(deck_theme)
        for img in img_list:
            files.append(img)

    player_1_keys = ["Q", "W", "E", "R", "F"]
    player_2_keys = ["U", "I", "O", "P", "J"]

    difficulty = int(request.form.get('difficulty', 4))
    player_1_keys_by_difficulty = player_1_keys[:difficulty]
    player_2_keys_by_difficulty = player_2_keys[:difficulty]

    player_1 = request.form.get('player_1', "Player 1")
    player_2 = request.form.get('player_2', "Player 2")

    return render_template('game.html',
                           player_1=player_1,
                           player_2=player_2,
                           player_1_keys=player_1_keys_by_difficulty,
                           player_2_keys=player_2_keys_by_difficulty,
                           files=files)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
