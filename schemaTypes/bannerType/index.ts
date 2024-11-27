import {defineType, defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const bannerType = defineType({
  name: 'banner',
  type: 'object',
  title: 'Banner',
  icon: BlockElementIcon,
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
      name: 'buttonLabel',
      type: 'string',
      title: 'Button Label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      type: 'url',  // Using url type for links
      title: 'Button Link',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})