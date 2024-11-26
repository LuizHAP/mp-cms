import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'mp-headless',

  projectId: 'yhrhi1m6',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})