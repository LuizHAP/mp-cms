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
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'Select the US state',
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
      validation: Rule => Rule.required().error('City is required'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1 to 5 stars',
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('Rating is required'),
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      description: 'The testimonial content',
      validation: Rule => Rule.required().error('Review is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image related to the testimonial (company logo or person)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility'
        }
      ],
    })
  ],
  preview: {
    select: {
      title: 'name',
      city: 'city',
      state: 'state',
      media: 'image'
    },
    prepare({title, city, state, media}) {
      if (media && !media.alt) {
        media.alt = `${title}`
      }

      return {
        title,
        subtitle: city && state ? `${city}, ${state}` : '',
        media
      }
    }
  }
})