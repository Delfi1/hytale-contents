'use client'

import { useState } from 'react';

export default function Downloader() {
  const [src, setSrc] = useState('');
  const [errMsg, setErrMsg] = useState('');

  async function handleClick() {
    console.log("Downloading...");
    // Clear error msg
    setErrMsg('');

    let current = src;
    let response = await fetch(`/api/download?src=${current}`, {
      method: 'POST',
      headers: { Accept: 'video/mp4' },
    });
    
    if (response.ok) {
      let blob = await response.blob();
      let url = URL.createObjectURL(blob);

      let link: HTMLAnchorElement = document.createElement('a');
      link.href = url;
      link.download = `${current}.mp4`;
      link.click();

      URL.revokeObjectURL(url);
      link.remove();
    } else {
      setErrMsg(await response.text());
    }
  }

  return (
    <div className='downloadBox'>
      <div className='downloader'>
        <div className='src'><input value={src} onChange={(e) => setSrc(e.target.value)} /></div>
        <button onClick={handleClick} className='download'>Download</button>
      </div>
      <h2 className='errorMsg'>{errMsg}</h2>
    </div>
  )
}