import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  description: 'Author profile for blog contributors',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'posts',
      title: 'Posts',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The full name of the author as it will appear on their posts and profile.',
      validation: (Rule) => Rule.required().error('Name is required'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly version of the author\'s name. This will be used in the author\'s profile URL.',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'name',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A brief biography of the author. This will appear on their profile page and author cards.',
      validation: (Rule) => Rule.required().error('Bio is required'),
      group: 'content',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'The author\'s profile picture. This will be used on their profile page and next to their posts. Recommended size: 400x400px, square ratio.',
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
      name: 'posts',
      title: 'Posts',
      type: 'array',
      description: 'A list of posts written by this author. This will be automatically updated when posts are assigned to this author.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }],
          options: {
            disableNew: true,
          },
        },
      ],
      group: 'posts',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bio',
      media: 'avatar',
    },
  },
  orderings: [
    {
      title: 'Author Name, A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Author Name, Z-A',
      name: 'nameDesc',
      by: [
        { field: 'name', direction: 'desc' }
      ]
    },
  ]
})