import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'
import { BookIcon, DocumentsIcon, HelpCircleIcon, StarIcon, TagIcon, UsersIcon, CaseIcon } from '@sanity/icons'
import { media } from 'sanity-plugin-media'
import { documentInternationalization } from '@sanity/document-internationalization'
import { table } from '@sanity/table';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { googleDrive, googleDriveAssetSource } from 'sanity-plugin-google-drive'

/// <reference types="vite/client" />
export default defineConfig({
  name: 'default',
  title: 'Machinery Partner CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',
  plugins: [
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'es', title: 'Spanish' },
      ],
      schemaTypes: ['blogPost', 'caseStudy', 'blogCategory', 'teamMember', 'testimonial', 'faq'],
    }),
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
                  ])
              ),
            // Case Studies
            S.listItem()
              .title('Case Studies')
              .icon(CaseIcon)
              .child(
                S.documentTypeList('caseStudy')
                  .title('Case Studies')
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
            // FAQs
            S.listItem()
              .title('FAQs')
              .icon(HelpCircleIcon)
              .child(
                S.documentTypeList('faq')
                  .title('FAQs')
              ),
          ])
    }),
    media(),
    visionTool(),
    codeInput(),
    colorInput(),
    table(),
    unsplashImageAsset(),
    googleDrive({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_DRIVE_API_KEY,
      clientId: process.env.SANITY_STUDIO_GOOGLE_DRIVE_CLIENT_ID,
    }),
    googleDriveAssetSource({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_DRIVE_API_KEY,
      clientId: process.env.SANITY_STUDIO_GOOGLE_DRIVE_CLIENT_ID,
    })
  ],
  schema: {
    types: schemaTypes,
  },
})