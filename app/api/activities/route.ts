import axios from 'axios'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { NextResponse } from 'next/server'

import { DISCORD_ID } from '@/utils'

dayjs.extend(duration)

function getVscodeAssetUrl(url: string) {
  return url.match(/https\/.*$/)?.[0].replace('https/', 'https://') as string
}

function formatTime(time: number) {
  return dayjs.duration(time).format('HH:mm:ss')
}

export async function GET() {
  const user = await axios
    .get(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
    .then((res) => res.data.data)
    .catch(() => null)
    
  if (!user) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
  
  const vscode = user?.activities?.find(
    (a: any) => ['Visual Studio Code', 'Code'].includes(a.name),
  )

  return NextResponse.json({
    vscode: vscode ? {
      largeImage: getVscodeAssetUrl(vscode.assets.large_image),
      largeText: vscode.assets.large_text ?? 'Visual Studio Code',
      smallImage: getVscodeAssetUrl(vscode.assets.small_image),
      smallText: vscode.assets.small_text ?? 'Visual Studio Code',
      details: vscode?.details,
      state: vscode?.state,
      time: formatTime(Date.now() - vscode.timestamps.start),
    } : null,
    spotify: user.spotify ? {
      album: user.spotify.album,
      albumArtUrl: user.spotify.album_art_url,
      artist: user.spotify.artist,
      song: user.spotify.song,
      time: formatTime(
        user.spotify.timestamps.end - user.spotify.timestamps.start,
      ),
      trackId: user.spotify.track_id,
    } : null
  })
}
