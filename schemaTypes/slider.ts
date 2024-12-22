import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'slider',
  title: 'Slider',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/webp'
      },
      validation: (Rule) =>
        Rule.custom((image) => {
          if (!image || !image.asset || !image.asset._ref) {
            return true
          }

          const imageAsset = image.asset as {
            _ref: string;
            metadata?: {
              dimensions?: {
                width: number;
                height: number;
              };
            };
          }

          if (!imageAsset.metadata?.dimensions) {
            return 'Image metadata is missing'
          }

          const { width, height } = imageAsset.metadata.dimensions

          if (width > 1200) {
            return 'Image width must not exceed 1200px'
          }

          const aspectRatio = width / height
          const expectedRatio = 3
          const tolerance = 0.01

          if (Math.abs(aspectRatio - expectedRatio) > tolerance) {
            return 'Image must have a 3:1 aspect ratio'
          }

          if (!imageAsset._ref.includes('webp')) {
            return 'Image must be in WebP format'
          }

          return true
        }),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO purposes.',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Title, Z-A',
      name: 'titleDesc',
      by: [
        { field: 'title', direction: 'desc' }
      ]
    },
  ]
})