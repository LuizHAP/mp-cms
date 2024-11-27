import { defineField, defineType } from 'sanity'

const categoryColors = [
  { title: 'Blue', value: 'blue' },
  { title: 'Cyan', value: 'cyan' },
  { title: 'Grape', value: 'grape' },
  { title: 'Gray', value: 'gray' },
  { title: 'Green', value: 'green' },
  { title: 'Indigo', value: 'indigo' },
  { title: 'Lime', value: 'lime' },
  { title: 'Orange', value: 'orange' },
  { title: 'Pink', value: 'pink' },
  { title: 'Red', value: 'red' },
  { title: 'Teal', value: 'teal' },
  { title: 'Violet', value: 'violet' },
  { title: 'Yellow', value: 'yellow' },
  { title: 'Brand', value: 'brand' },
]

export default defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'meta',
      title: 'Meta',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the category as it will appear on the website.',
      group: 'content',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly version of the title. This will be used in the category URL.',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the category. This will appear on the category page and in category cards.',
      group: 'content',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'The main image representing this category. This will be displayed on the category page and in category listings.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO purposes.',
        },
      ],
      group: 'meta',
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Select a color for the category. This will be used for visual identification and UI elements.',
      options: {
        list: categoryColors.map(({title, value}) => ({
          title: title,
          value: value
        })),
        layout: 'dropdown'
      },
      initialValue: '#ffc25c', // Brand color as default
      validation: (Rule) => Rule.required().error('Color selection is required'),
      group: 'meta',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title that appears in search engine results. If not set, the category title will be used.',
      group: 'seo',
      validation: (Rule) => Rule.max(70).warning('Meta title should not exceed 70 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'A brief description that appears in search engine results. If not set, the category description will be used.',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Meta descriptions should not exceed 160 characters'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Category Name, A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Category Name, Z-A',
      name: 'titleDesc',
      by: [
        { field: 'title', direction: 'desc' }
      ]
    },
  ]
})