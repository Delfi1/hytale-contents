from flask import Flask, Response, send_file, request
app = Flask(__name__)

import yt_dlp, imageio_ffmpeg

class Logger:
    def debug(self, msg):
        pass

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

@app.route('/api/download', methods=["GET", "POST"])
def download():
    src = request.args.get('src')
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

    opts = {
        'outtmpl': '/tmp/%(title)s.%(ext)s',
        'ffmpeg_location': ffmpeg,
        'format': 'bestvideo+bestaudio',
        'logger': Logger()
    }

    try:
        with yt_dlp.YoutubeDL(opts) as ytdlp:
            ytdlp.download([f"https://iframe.videodelivery.net/{src}"])
    except Exception as e:
        return Response(str(e), 400)
    
    return send_file(f"/tmp/{src}.mp4", download_name=f"{src}.mp4", as_attachment=True)