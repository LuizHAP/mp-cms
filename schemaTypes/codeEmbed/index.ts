import { defineType } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

export default defineType({
  name: 'codeEmbed',
  title: 'Code Embed',
  icon: CodeBlockIcon,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional: Add a title or description for this embed'
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      description: 'Paste your embed code here (iframe, script, etc.)',
      validation: Rule => Rule.required().error('Embed code is required')
    }
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code'
    },
    prepare({ title, code }) {
      return {
        title: title || 'Code Embed',
        subtitle: code ? `${code.substring(0, 50)}...` : 'No code added'
      }
    }
  }
})