import { isMediaStream, isBlobUrl } from './utils'

export const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
export const MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/
export const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i
export const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i
export const DASH_EXTENSIONS = /\.(mpd)($|\?)/i
export const FLV_EXTENSIONS = /\.(flv)($|\?)/i

const canPlayFile = url => {
  if (url instanceof Array) {
    for (const item of url) {
      if (typeof item === 'string' && canPlayFile(item)) {
        return true
      }
      if (canPlayFile(item.src)) {
        return true
      }
    }
    return false
  }
  if (isMediaStream(url) || isBlobUrl(url)) {
    return true
  }
  return (
    AUDIO_EXTENSIONS.test(url) ||
    VIDEO_EXTENSIONS.test(url) ||
    HLS_EXTENSIONS.test(url) ||
    DASH_EXTENSIONS.test(url) ||
    FLV_EXTENSIONS.test(url)
  )
}

export const canPlay = {
  youtube: url => {
    if (url instanceof Array) {
      return url.every(item => MATCH_URL_YOUTUBE.test(item))
    }
    return MATCH_URL_YOUTUBE.test(url)
  },
  streamable: url => MATCH_URL_STREAMABLE.test(url),
  file: canPlayFile
}
