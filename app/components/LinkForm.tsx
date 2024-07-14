'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createLinkSchema, type CreateLinkParams } from '@/db/schema'

const formSchema = createLinkSchema

const LinkForm = () => {
  const form = useForm<CreateLinkParams>({
    resolver: zodResolver(formSchema),
  })

  return <></>
}

export default LinkForm
