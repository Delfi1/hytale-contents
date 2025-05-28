'use client'

import { useState } from 'react';

export default function Downloader() {
  const [src, setSrc] = useState('');

  async function handleClick() {
    console.log("Downloading...");

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = `/api/yt_dlp/download?src=${src}`;
    link.click();
    link.remove();
  }

  return (
    <div>
      <div><input value={src} style={{ 'border': "white", color: "black", padding: "0px 10px 0px 10px" }} onChange={(e) => setSrc(e.target.value)} /></div>
      <button onClick={handleClick} className='download'>Download</button>
    </div>
  )
}