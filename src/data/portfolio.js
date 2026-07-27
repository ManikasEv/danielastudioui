import propertyVideo from '../assets/propertyvideo1.mp4'
import commercialVideo from '../assets/commercial1.mp4'

/** Live site preview via WordPress mShots (free screenshot CDN). */
export function sitePreview(url, width = 1400) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`
}

/**
 * Portfolio catalog — ONLY real projects / files from assets.
 * type: 'walkthrough' | 'pano360' | 'video' | 'image' | 'site'
 * Copy: i18n → portfolio.items.[id]
 */
export const PORTFOLIO = {
  properties: [
    {
      id: 'prop-walkthrough',
      type: 'video',
      src: propertyVideo,
    },
  ],
  commercials: [
    {
      id: 'com-film-1',
      type: 'video',
      src: commercialVideo,
    },
  ],
  websites: [
    {
      id: 'web-gpfugen',
      type: 'site',
      url: 'https://gpfugen.ch/',
      src: sitePreview('https://gpfugen.ch/'),
    },
    {
      id: 'web-insideobservation',
      type: 'site',
      url: 'https://insideobservation.com/',
      src: sitePreview('https://insideobservation.com/'),
    },
    {
      id: 'web-steki',
      type: 'site',
      url: 'https://steki.ch/',
      src: sitePreview('https://steki.ch/'),
    },
    {
      id: 'web-mera',
      type: 'site',
      url: 'https://meracosmetics.ch/',
      src: sitePreview('https://meracosmetics.ch/'),
    },
    {
      id: 'web-jaho',
      type: 'site',
      url: 'https://jaho-plattenleger.ch/',
      src: sitePreview('https://jaho-plattenleger.ch/'),
    },
    {
      id: 'web-hextech',
      type: 'site',
      url: 'https://hextech-it.ch/',
      src: sitePreview('https://hextech-it.ch/'),
    },
  ],
}

export const PORTFOLIO_TABS = ['properties', 'commercials', 'websites']
