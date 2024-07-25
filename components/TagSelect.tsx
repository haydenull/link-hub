import { useQuery } from '@tanstack/react-query'

import { queries } from '@/services/queries'

import { MultiSelect } from './MultiSelect'

const TagSelect = ({ value, onChange }: { value: number[]; onChange: (value: number[]) => void }) => {
  const { data: tagList } = useQuery(queries.tags.all)

  const options = tagList?.map((tag) => ({ value: String(tag.id), label: tag.name })) ?? []

  return (
    <MultiSelect selected={value.map(String)} onChange={(value) => onChange(value.map(Number))} options={options} />
  )
}

export default TagSelect
