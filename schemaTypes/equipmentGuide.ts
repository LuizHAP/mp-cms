import { defineField, defineType } from 'sanity'
import { ThListIcon } from '@sanity/icons'
import AsyncSelect from '../components/AsyncSelect';

const BACKEND_URL = 'https://mp-website-git-feat-search-models-machinerypartner.vercel.app'
const API_URL = `${BACKEND_URL}/api/models`

export default defineType({
  name: 'equipmentGuide',
  title: 'Equipment Guide',
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
      description: 'The main title of the page',
      validation: (Rule) => Rule.required().error('Title is required'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL-friendly version of the title',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'heroContent',
      title: 'Hero Content',
      description: 'Content displayed in the hero section.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
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
        }
      ],
      group: 'content',
    }),
    defineField({
      name: 'heroEquipment',
      title: 'Hero Equipment',
      type: 'string',
      options: {
        list: [],
        url: API_URL,
        formatResponse: (data: any) => data.map((item: any) => {
          return {
            label: item.model_name,
            value: item.model_slug,
            image: item.model_image,
          }
        }),
      } as any,
      components: {
        input: AsyncSelect
      }
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      description: 'The main content sections of the page',
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
              description: 'Optional title for the section',
            }),
            defineField({
              name: 'sectionContent',
              title: 'Section Content',
              description: 'The content of the section',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 4', value: 'h4' },
                    { title: 'Heading 5', value: 'h5' },
                    { title: 'Heading 6', value: 'h6' },
                    { title: 'Quote', value: 'blockquote' },
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
                  type: 'youTube',
                },
                {
                  type: 'banner',
                },
                {
                  type: 'callout',
                },
                {
                  type: 'codeEmbed',
                },
                {
                  type: 'table',
                  icon: ThListIcon,
                },
              ],
            }),
            defineField({
              name: 'equipment',
              title: 'Equipment',
              description: 'Equipment will displayed in a carousel',
              type: 'array',
              of: [
                {
                  name: 'modelSlug',
                  title: 'Model Slug',
                  type: 'string',
                  options: {
                    list: [],
                    url: API_URL,
                    formatResponse: (data: any) => data.map((item: any) => {
                      return {
                        label: item.model_name,
                        value: item.model_slug,
                        image: item.model_image,
                      }
                    }),
                  } as any,
                  components: {
                    input: AsyncSelect
                  }
                },
              ],
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
            })
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              sectionContent: 'sectionContent',
            },
            prepare({ title, sectionContent }) {
              // If there's no title, use the first few words of the legal text
              const previewTitle = title || (sectionContent && sectionContent[0]?.children?.[0]?.text?.slice(0, 50) + '...');
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