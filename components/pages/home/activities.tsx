'use client'

import axios from 'axios'
import useSWR from 'swr'

import { SpotifyCard } from './spotify-card'
import { VscodeCard } from './vscode-card'

export interface Vscode {
  largeImage: string
  largeText: string
  smallImage: string
  smallText: string
  details: string
  state: string
  time: string
}

export interface Spotify {
  album: string
  albumArtUrl: string
  artist: string
  song: string
  time: string
  trackId: string
}

interface ActivitiesResponse {
  vscode: Vscode
  spotify: Spotify
}

export function Activities() {
  const { data, isLoading, error } = useSWR<ActivitiesResponse>(
    '/api/activities',
    () => axios.get('/api/activities').then((response) => response.data),
    { revalidateOnFocus: false },
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
      {isLoading && !error && (
        <>
          <div className="h-[150px] p-4 flex flex-col gap-2 rounded-md bg-gray-100 animate-pulse"></div>
          <div className="h-[150px] p-4 flex flex-col gap-2 rounded-md bg-gray-100 animate-pulse"></div>
        </>
      )}
      
      {data?.vscode && <VscodeCard vscode={data?.vscode} />}
      {data?.spotify && <SpotifyCard spotify={data?.spotify} />}
    </div>
  )
}
