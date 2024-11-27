import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {BookIcon, DocumentsIcon, StarIcon, TagIcon, UserIcon, UsersIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Machinery Partner CMS',

  projectId: 'yhrhi1m6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Blog folder
            S.listItem()
              .title('Blog')
              .icon(BookIcon)
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Posts')
                      .icon(DocumentsIcon)
                      .child(
                        S.documentTypeList('blogPost')
                      ),
                    S.listItem()
                      .title('Categories')
                      .icon(TagIcon)
                      .child(
                        S.documentTypeList('blogCategory')
                      ),
                    S.listItem()
                      .title('Authors')
                      .icon(UserIcon)
                      .child(
                        S.documentTypeList('author')
                      ),
                  ])
              ),
            // Team Members
            S.listItem()
              .title('Team')
              .icon(UsersIcon)
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
              ),
            // Ratings
            S.listItem()
              .title('Testimonials')
              .icon(StarIcon)
              .child(
                S.documentTypeList('testimonial')
                  .title('Testimonials')
              ),
          ])

    }),
    visionTool(),
    codeInput(),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },
})