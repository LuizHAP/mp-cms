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
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'displayPage',
      title: 'Display Page',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Deals', value: 'deals' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required().error('Please select a page to display the slider'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/webp',
        storeOriginalFilename: true,
      },
      validation: (Rule) =>
        Rule.custom(async (image) => {
          if (!image || !image.asset) {
            return true
          }

          // Check file format first since it's available in the _ref
          if (!image.asset._ref.includes('webp')) {
            return 'Image must be in WebP format'
          }

          try {
            // Split the asset reference
            const parts = image.asset._ref.split('-')

            // The format is: image-[hash]-[width]x[height]-[format]
            // Find the part that contains the dimensions (contains 'x')
            const dimensionPart = parts.find(part => part.includes('x'))
            if (!dimensionPart) {
              return 'Unable to determine image dimensions'
            }

            // Split the dimensions
            const [width, height] = dimensionPart.split('x').map(Number)

            if (width > 1200) {
              return 'Image width must not exceed 1200px'
            }

            const aspectRatio = width / height
            const expectedRatio = 3
            const tolerance = 0.1

            if (Math.abs(aspectRatio - expectedRatio) > tolerance) {
              return `Image must have a 3:1 aspect ratio (current ratio: ${aspectRatio.toFixed(2)}:1)`
            }

            return true
          } catch (error) {
            console.error('Error parsing dimensions:', error)
            return 'Error validating image dimensions'
          }
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
      displayPage: 'displayPage'
    },
    prepare({ title, subtitle, displayPage }) {
      return {
        title,
        subtitle: `${displayPage.charAt(0).toUpperCase() + displayPage.slice(1)} - ${subtitle || ''}`
      }
    }
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