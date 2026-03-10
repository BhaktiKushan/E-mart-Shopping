import { mobileData } from '../../data/mobiles'
import { computerData } from '../../data/computers'
import { fridgeData } from '../../data/fridge'
import { furnitureData } from '../../data/furniture'
import { kitchenData } from '../../data/kitchen'
import { menData } from '../../data/men'
import { womanData } from '../../data/woman'
import { acData } from '../../data/ac'
import { speakerData } from '../../data/speaker'
import { tvData } from '../../data/tv'
import { watchData } from '../../data/watch'

const withMeta = (items, type, routeBase) =>
  items.map((item) => ({
    ...item,
    type,
    routeBase,
    uniqueId: `${type}-${item.id}`,
    displayName: `${item.company || item.brand} ${item.model}`,
  }))

export const allProducts = [
  ...withMeta(mobileData, 'mobiles', '/mobiles'),
  ...withMeta(computerData, 'computers', '/computers'),
  ...withMeta(fridgeData, 'fridge', '/fridge'),
  ...withMeta(furnitureData, 'furniture', '/furniture'),
  ...withMeta(kitchenData, 'kitchen', '/kitchen'),
  ...withMeta(menData, 'men', '/men'),
  ...withMeta(womanData, 'woman', '/woman'),
  ...withMeta(acData, 'ac', '/ac'),
  ...withMeta(speakerData, 'speaker', '/speaker'),
  ...withMeta(tvData, 'tv', '/tv'),
  ...withMeta(watchData, 'watch', '/watch'),
]
