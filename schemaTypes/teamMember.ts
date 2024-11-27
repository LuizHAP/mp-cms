import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the team member',
      validation: Rule => Rule.required().error('Name is required.'),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      description: 'Current position or role within the company',
      validation: Rule => Rule.required().error('Job title is required.'),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Department or division where the team member works',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'string',
      description: 'LinkedIn profile URL of the team member',
      validation: Rule => Rule.required().error('LinkedIn URL is required.'),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Profile picture of the team member (1:1 aspect ratio, recommended 256x256px)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ],
      validation: Rule => Rule.custom((field: any) => {
        if (!field) return true // Allow empty field
        if (!field.asset || !field.asset.metadata || !field.asset.metadata.dimensions) {
          return true
        }
        const {dimensions} = field.asset.metadata
        if (dimensions.aspectRatio !== 1) {
          return 'Avatar must have a 1:1 aspect ratio'
        }
        return true
      })
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'jobTitle',
      media: 'avatar'
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      if (media && media.asset) {
        media.alt = `Portrait of ${title}`
      }
      return {
        title,
        subtitle,
        media
      }
    }
  }
})