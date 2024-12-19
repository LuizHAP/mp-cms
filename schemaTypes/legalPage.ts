import { defineField, defineType } from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
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
      description: 'The main title of the legal page (e.g., "Terms of Service", "Privacy Policy")',
      validation: (Rule) => Rule.required().error('Title is required'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly version of the title (e.g., "terms-of-service")',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'A brief summary of the page.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      description: 'The date when this legal document was last modified',
      validation: (Rule) => Rule.required().error('Last updated date is required'),
      group: 'meta',
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      description: 'The main content sections of the legal document',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
              description: 'Optional title for this section (e.g., "2. Registration", "User Account")',
            }),
            defineField({
              name: 'legalText',
              title: 'Legal Text',
              description: 'The formal legal text for this section',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 4', value: 'h4' },
                    { title: 'Heading 5', value: 'h5' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'string',
                            title: 'URL',
                            validation: (Rule) => {
                              return Rule.custom((value: string | undefined) => {
                                if (!value) return true;
                                if (value.startsWith('/')) return true;
                                try {
                                  new URL(value);
                                  return true;
                                } catch {
                                  return 'Please enter a valid URL or relative path';
                                }
                              });
                            },
                          },
                          {
                            name: 'target',
                            type: 'string',
                            title: 'Target',
                            options: {
                              list: [
                                { title: 'Same window', value: '_self' },
                                { title: 'New window', value: '_blank' }
                              ]
                            },
                            initialValue: '_self'
                          }
                        ]

                      }
                    ]
                  }
                },
                {
                  type: 'table',
                  icon: ThListIcon,
                },
              ],
              validation: (Rule) => Rule.required().error('Legal text is required'),
            }),
            defineField({
              name: 'basicallySummary',
              title: 'Basically Summary',
              type: 'text',
              description: 'A plain-language explanation of what this section means',
              validation: (Rule) => Rule.required().error('Basically summary is required'),
            }),
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              legalText: 'legalText',
            },
            prepare({ title, legalText }) {
              // If there's no title, use the first few words of the legal text
              const previewTitle = title || (legalText && legalText[0]?.children?.[0]?.text?.slice(0, 50) + '...');
              return {
                title: previewTitle || 'Untitled Section',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title for the page (recommended length: 60 characters or less)',
      validation: (Rule) => Rule.max(60).warning('Meta title should be shorter than 60 chars.'),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description for the page (recommended length: between 120 and 160 characters)',
      validation: (Rule) =>
        Rule.custom((text) => {
          if (!text) return true;
          if (text.length < 120) return 'Meta description should have at least 120 characters';
          if (text.length > 160) return 'Meta description should be shorter than 160 characters';
          return true;
        }).warning(),
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Last updated: ${new Date(subtitle).toLocaleDateString()}`,
      }
    },
  },
})