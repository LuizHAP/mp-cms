import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'media',
      title: 'Media',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL-friendly version of the title. This will be used in the post URL.',
      type: 'slug',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'name',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Select the category this post belongs to.',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'postSummary',
      title: 'Post Summary',
      description: 'A brief summary of the post. This will be used as the meta description and preview text. Maximum 160 characters.',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.max(160).error('Post summary should not exceed 160 characters'),
    }),
    defineField({
      name: 'postBody',
      title: 'Post Body',
      description: 'The main content of the blog post. You can add text, images, videos, and custom components.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
          ],
        },
        {
          type: 'youTube',
        },
        {
          type: 'banner',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'The main image for the post. This will be displayed at the top of the post and used for thumbnails. Recommended size: 1200x630px.',
      type: 'image',
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
      group: 'media',
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      description: 'Mark this post as popular to feature it in popular posts sections.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Mark this post as featured to display it prominently on the website.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'createdOn',
      title: 'Created On',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'publishedOn',
      title: 'Published On',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      description: 'Select the author of this post.',
      group: 'meta',
    }),
    defineField({
      name: 'relatedModels',
      title: 'Related Models',
      type: 'array',
      of: [
        {
          name: 'modelSlug',
          title: 'Model Slug',
          type: 'string',
        },
      ],
      group: 'settings',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }],
          options: {
            disableNew: true, // Prevents creating new posts from this field
          },
        }
      ],
      validation: (Rule) => Rule.unique(), // Prevents duplicate references
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'postSummary',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Post Date, New',
      name: 'postDateDesc',
      by: [
        { field: 'publishedOn', direction: 'desc' }
      ]
    },
    {
      title: 'Post Date, Old',
      name: 'postDateAsc',
      by: [
        { field: 'publishedOn', direction: 'asc' }
      ]
    },
  ]
})