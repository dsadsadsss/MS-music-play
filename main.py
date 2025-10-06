import os
from flask import Flask, jsonify, render_template, url_for

app = Flask(__name__)

MUSIC_FOLDER = 'static/music'
ALLOWED_EXTENSIONS = {'.mp3', '.wav', '.ogg'} # 可以根据需要添加更多格式

@app.route('/')
def index():
    """渲染播放器主页面"""
    return render_template('index.html')

@app.route('/api/songs')
def get_songs():
    """扫描音乐文件夹并返回歌曲列表"""
    songs = []
    if not os.path.exists(MUSIC_FOLDER):
        os.makedirs(MUSIC_FOLDER) # 如果文件夹不存在则创建
        return jsonify([]) # 返回空列表，提示用户添加歌曲

    for filename in os.listdir(MUSIC_FOLDER):
        if os.path.splitext(filename)[1].lower() in ALLOWED_EXTENSIONS:
            songs.append({
                'title': os.path.splitext(filename)[0], # 获取不带扩展名的文件名作为标题
                'filename': filename,
                'url': url_for('static', filename=f'music/{filename}') # 生成歌曲的URL
            })
    return jsonify(songs)

if __name__ == '__main__':
    # 确保 music 文件夹存在
    if not os.path.exists(MUSIC_FOLDER):
        os.makedirs(MUSIC_FOLDER)
        print(f"'{MUSIC_FOLDER}' 文件夹已创建。请将你的音乐文件 (例如 .mp3) 放入此文件夹。")

    app.run(host='127.0.0.1', port=9002, debug=True)
