document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playlistElement = document.getElementById('playlist');
    const currentSongTitleElement = document.getElementById('current-song-title');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const noSongsMessageElement = document.querySelector('.no-songs-message');


    let songs = [];
    let currentSongIndex = 0;
    let isPlaying = false;

    // 获取歌曲列表
    fetch('/api/songs')
        .then(response => response.json())
        .then(data => {
            songs = data;
            renderPlaylist();
            if (songs.length > 0) {
                loadSong(currentSongIndex);
                if(noSongsMessageElement) noSongsMessageElement.style.display = 'none';
            } else {
                 if(noSongsMessageElement) noSongsMessageElement.textContent = '播放列表为空。请在 "static/music" 文件夹中添加音乐文件并刷新页面。';
            }
        })
        .catch(error => {
            console.error('获取歌曲列表失败:', error);
            if(noSongsMessageElement) noSongsMessageElement.textContent = '无法加载歌曲列表，请检查后端服务是否运行。';
        });

    // 渲染播放列表
    function renderPlaylist() {
        playlistElement.innerHTML = ''; // 清空现有列表
        if (songs.length === 0 && noSongsMessageElement) {
            noSongsMessageElement.style.display = 'list-item';
            return;
        }

        songs.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = song.title;
            listItem.dataset.index = index;
            listItem.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
            playlistElement.appendChild(listItem);
        });
    }

    // 加载歌曲
    function loadSong(index) {
        if (songs.length === 0) return;
        const song = songs[index];
        audioPlayer.src = song.url;
        currentSongTitleElement.textContent = song.title;
        updatePlaylistHighlight();
    }

    // 更新播放列表高亮
    function updatePlaylistHighlight() {
        const items = playlistElement.querySelectorAll('li');
        items.forEach((item, idx) => {
            if (idx === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 播放歌曲
    function playSong() {
        if (songs.length === 0) return;
        isPlaying = true;
        audioPlayer.play();
        playPauseBtn.textContent = '暂停';
    }

    // 暂停歌曲
    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playPauseBtn.textContent = '播放';
    }

    // 播放/暂停切换
    playPauseBtn.addEventListener('click', () => {
        if (songs.length === 0) return;
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // 上一首
    prevBtn.addEventListener('click', () => {
        if (songs.length === 0) return;
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) playSong(); // 如果之前在播放，则自动播放新歌曲
    });

    // 下一首
    nextBtn.addEventListener('click', () => {
        if (songs.length === 0) return;
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) playSong(); // 如果之前在播放，则自动播放新歌曲
    });

    // 音量控制
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });
    
    // 歌曲播放结束时自动播放下一首
    audioPlayer.addEventListener('ended', () => {
        nextBtn.click(); // 模拟点击下一首按钮
    });

    // 监听播放和暂停事件以更新按钮状态（例如，当使用浏览器原生控件时）
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.textContent = '暂停';
        updatePlaylistHighlight();
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.textContent = '播放';
    });

});
