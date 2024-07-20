import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

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
