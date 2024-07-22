import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import type { Tag } from '@/db/schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type RemoveNullable<T> = {
  [K in keyof T]: T[K] extends z.ZodOptional<z.ZodNullable<infer U>>
    ? z.ZodOptional<U>
    : T[K] extends z.ZodNullable<infer U>
      ? U
      : T[K]
}

/** 去除 zod schema 中的 nullable */
export function removeNullableFromObject<T extends z.ZodRawShape>(schema: z.ZodObject<T, any, any>) {
  const newShape = Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodOptional && value._def.innerType instanceof z.ZodNullable) {
        return [key, z.optional(value._def.innerType.unwrap())]
      }
      if (value instanceof z.ZodNullable) {
        return [key, value.unwrap()]
      }
      return [key, value]
    }),
  ) as RemoveNullable<T>

  return z.object(newShape) as z.ZodObject<RemoveNullable<T>, 'strip', z.ZodTypeAny>
}

type TreeTag = {
  id: number
  name: string
  fullPath: string
  children?: TreeTag[]
}
/** 将 Tag List 转为 Tag Tree */
export function convertTagListToTagTree(flatTags: Tag[]) {
  const root: TreeTag[] = []
  const map: Record<string, TreeTag> = {}

  flatTags.forEach((tag) => {
    const parts = tag.name.split('/')
    parts.reduce((parent, part, index) => {
      const path = parts.slice(0, index + 1).join('/')
      if (!map[path]) {
        const newNode: TreeTag = {
          id: index === parts.length - 1 ? tag.id : -1,
          name: part,
          fullPath: path,
        }
        map[path] = newNode
        if (index === 0) {
          root.push(newNode)
        } else {
          parent.children = parent.children || []
          parent.children.push(newNode)
        }
      }
      return map[path]
    }, {} as TreeTag)
  })

  return root
}
