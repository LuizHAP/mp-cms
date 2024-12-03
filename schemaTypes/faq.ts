import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: Rule => Rule.required().error('Question is required'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      description: 'The answer to the question',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
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

                        // Allow relative paths starting with /
                        if (value.startsWith('/')) return true;

                        // Allow mailto: and tel: links
                        if (value.startsWith('mailto:')) return true;
                        if (value.startsWith('tel:')) return true;

                        // Validate external URLs
                        try {
                          new URL(value);
                          return true;
                        } catch {
                          return 'Please enter a valid URL, relative path (starting with /), mailto: or tel: link';
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
          },
        },
      ],
      validation: Rule => Rule.required().error('Answer is required'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare(selection: Record<string, any>) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle
          ? subtitle
          .filter((block: any) => block._type === 'block')
          .map((block: any) =>
            block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          )
          .join(' ')
          .slice(0, 50) + '...'
          : ''
      }
    }
  }
})