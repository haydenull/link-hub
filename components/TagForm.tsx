'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createTagSchema, type CreateTagParams, type Tag } from '@/db/schema'
import { createTag, updateTag } from '@/services/actions'
import { queries } from '@/services/queries'

const formSchema = createTagSchema.merge(
  z.object({
    name: z.string().min(1),
  }),
)

const SharedTagForm = ({
  form,
  onSubmit,
  isSubmitting,
  submitText = 'Save',
}: {
  form: UseFormReturn<CreateTagParams>
  onSubmit: (values: CreateTagParams) => void
  isSubmitting: boolean
  submitText?: string
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const CreateTagForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<CreateTagParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      onSuccess?.()
      form.reset()
      queryClient.invalidateQueries({
        queryKey: queries.tags._def,
      })
    },
  })
  return <SharedTagForm form={form} onSubmit={mutate} isSubmitting={isPending} submitText="Create" />
}

export const UpdateTagForm = ({ tagData, onSuccess }: { tagData: Tag; onSuccess?: () => void }) => {
  const form = useForm<CreateTagParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tagData.name || '',
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      onSuccess?.()
      form.reset()
      queryClient.invalidateQueries({
        queryKey: queries.tags._def,
      })
    },
  })
  return (
    <SharedTagForm
      form={form}
      onSubmit={(values) => mutate({ id: tagData.id, data: values })}
      isSubmitting={isPending}
    />
  )
}
