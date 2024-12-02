import {defineType, defineField} from 'sanity'
import {WarningOutlineIcon} from '@sanity/icons'

export const calloutType = defineType({
  name: 'callout',
  type: 'object',
  title: 'Callout',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' },
          { title: 'Tip', value: 'tip' },
        ]
      }
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})