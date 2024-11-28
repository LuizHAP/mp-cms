import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
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
      description: 'The main content of the case study. You can add text, images and videos.',
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
      to: [{ type: 'teamMember' }],
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
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Recommended length: 60 characters or less',
      validation: (Rule) => Rule.max(60).warning('Meta title should be shorter than 60 chars.'),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Recommended length: between 120 and 160 characters',
      validation: (Rule) =>
        Rule.custom((text) => {
          if (!text) return true
          if (text.length < 120) return 'Meta description should have at least 120 characters'
          if (text.length > 160) return 'Meta description should be shorter than 160 characters'
          return true
        }).warning(),
      group: 'seo',
    })
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