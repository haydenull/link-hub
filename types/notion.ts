export type Page = {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: 'user'
    id: string
  }
  last_edited_by: {
    object: 'user'
    id: string
  }
  archived: boolean
  in_trash: boolean
  properties: {
    Name: NameProperty
    Tags: TagsProperty
    URL: URLProperty
    Date: DateProperty
    Remark: RemarkProperty
  }
}

type NameProperty = {
  id: 'title'
  type: 'title'
  title?: Text[]
}
type TagsProperty = {
  id: string
  type: 'multi_select'
  multi_select?: { id: string; name: string; color: string }[]
}
type URLProperty = {
  id: string
  type: 'url'
  url: string
}
type DateProperty = {
  id: string
  type: 'date'
  date: {
    start: string
    end: null
    time_zone: null
  }
}
type RemarkProperty = {
  id: string
  type: 'rich_text'
  rich_text?: Text[]
}
type Text = {
  type: 'text'
  text: {
    content: string
    link: null
  }
  plain_text: string
  href: null
}
