import { lazy, supportsWebKitPresentationMode } from '../utils'
import { canPlay, AUDIO_EXTENSIONS } from '../patterns'

export default [
  {
    key: 'youtube',
    name: 'YouTube',
    canPlay: canPlay.youtube,
    lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerYouTube' */'./YouTube'))
  },
  {
    key: 'streamable',
    name: 'Streamable',
    canPlay: canPlay.streamable,
    lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerStreamable' */'./Streamable'))
  },
  {
    key: 'file',
    name: 'FilePlayer',
    canPlay: canPlay.file,
    canEnablePIP: url => {
      return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
    },
    lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerFilePlayer' */'./FilePlayer'))
  }
]
