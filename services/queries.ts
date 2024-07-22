import { createQueryKeyStore } from '@lukemorales/query-key-factory'

import { getLinkList, getLinkListByTagId, getLinkListWithoutTag, getTagList } from './actions'

export const queries = createQueryKeyStore({
  links: {
    all: {
      queryKey: null,
      queryFn: () => getLinkList(),
    },
    noTag: {
      queryKey: null,
      queryFn: () => getLinkListWithoutTag(),
    },
    byTagId: (tagId: number) => ({
      queryKey: [tagId],
      queryFn: () => getLinkListByTagId(tagId),
    }),
  },
  tags: {
    all: {
      queryKey: null,
      queryFn: () => getTagList(),
    },
  },
})
