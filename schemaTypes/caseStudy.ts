import { defineField, defineType } from 'sanity'

const usStates = [
  { title: 'Alabama', value: 'AL' },
  { title: 'Alaska', value: 'AK' },
  { title: 'Arizona', value: 'AZ' },
  { title: 'Arkansas', value: 'AR' },
  { title: 'California', value: 'CA' },
  { title: 'Colorado', value: 'CO' },
  { title: 'Connecticut', value: 'CT' },
  { title: 'Delaware', value: 'DE' },
  { title: 'Florida', value: 'FL' },
  { title: 'Georgia', value: 'GA' },
  { title: 'Hawaii', value: 'HI' },
  { title: 'Idaho', value: 'ID' },
  { title: 'Illinois', value: 'IL' },
  { title: 'Indiana', value: 'IN' },
  { title: 'Iowa', value: 'IA' },
  { title: 'Kansas', value: 'KS' },
  { title: 'Kentucky', value: 'KY' },
  { title: 'Louisiana', value: 'LA' },
  { title: 'Maine', value: 'ME' },
  { title: 'Maryland', value: 'MD' },
  { title: 'Massachusetts', value: 'MA' },
  { title: 'Michigan', value: 'MI' },
  { title: 'Minnesota', value: 'MN' },
  { title: 'Mississippi', value: 'MS' },
  { title: 'Missouri', value: 'MO' },
  { title: 'Montana', value: 'MT' },
  { title: 'Nebraska', value: 'NE' },
  { title: 'Nevada', value: 'NV' },
  { title: 'New Hampshire', value: 'NH' },
  { title: 'New Jersey', value: 'NJ' },
  { title: 'New Mexico', value: 'NM' },
  { title: 'New York', value: 'NY' },
  { title: 'North Carolina', value: 'NC' },
  { title: 'North Dakota', value: 'ND' },
  { title: 'Ohio', value: 'OH' },
  { title: 'Oklahoma', value: 'OK' },
  { title: 'Oregon', value: 'OR' },
  { title: 'Pennsylvania', value: 'PA' },
  { title: 'Rhode Island', value: 'RI' },
  { title: 'South Carolina', value: 'SC' },
  { title: 'South Dakota', value: 'SD' },
  { title: 'Tennessee', value: 'TN' },
  { title: 'Texas', value: 'TX' },
  { title: 'Utah', value: 'UT' },
  { title: 'Vermont', value: 'VT' },
  { title: 'Virginia', value: 'VA' },
  { title: 'Washington', value: 'WA' },
  { title: 'West Virginia', value: 'WV' },
  { title: 'Wisconsin', value: 'WI' },
  { title: 'Wyoming', value: 'WY' }
]

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
      rows: 4,
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
      name: 'company',
      title: 'Company',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'Select the US state',
      group: 'meta',
      options: {
        list: usStates,
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('State is required'),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'City name',
      group: 'meta',
      validation: Rule => Rule.required().error('City is required'),
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