import { createQueryKeyStore } from '@lukemorales/query-key-factory'

import {
  getLinkList,
  getLinkListByKeyword,
  getLinkListByTagId,
  getLinkListWithoutTag,
  getTagList,
  getTagListByKeyword,
} from './actions'

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
    byKeyword: (keyword: string) => ({
      queryKey: [keyword],
      queryFn: () => getLinkListByKeyword(keyword),
    }),
  },
  tags: {
    all: {
      queryKey: null,
      queryFn: () => getTagList(),
    },
    byKeyword: (keyword: string) => ({
      queryKey: [keyword],
      queryFn: () => getTagListByKeyword(keyword),
    }),
  },
})
