'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createLinkSchema, type CreateLinkParams, type Link } from '@/db/schema'
import { createLink, updateLink } from '@/services/actions'
import { queries } from '@/services/queries'

const formSchema = createLinkSchema.merge(
  z.object({
    remark: z.string().min(1),
    url: z.string().url(),
  }),
)

const SharedTLinkForm = ({
  form,
  onSubmit,
  isSubmitting,
  submitText = 'Save',
}: {
  form: UseFormReturn<CreateLinkParams>
  onSubmit: (values: CreateLinkParams) => void
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
        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="remark"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl>
                <Textarea placeholder="remark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const CreateLinkForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<CreateLinkParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      remark: '',
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      onSuccess?.()
      form.reset()
      queryClient.invalidateQueries({
        queryKey: queries.links._def,
      })
    },
  })
  return <SharedTLinkForm form={form} onSubmit={mutate} isSubmitting={isPending} submitText="Create" />
}

export const UpdateLinkForm = ({ linkData, onSuccess }: { linkData: Link; onSuccess?: () => void }) => {
  const form = useForm<CreateLinkParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: linkData.name || '',
      url: linkData.url,
      remark: linkData.remark,
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      onSuccess?.()
      form.reset()
      queryClient.invalidateQueries({
        queryKey: queries.links._def,
      })
    },
  })
  return (
    <SharedTLinkForm
      form={form}
      onSubmit={(values) => mutate({ id: linkData.id, data: values })}
      isSubmitting={isPending}
    />
  )
}
