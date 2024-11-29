import { defineLocations } from 'sanity/presentation'

export default defineLocations({
  select: { title: 'title', slug: 'slug.current' },
  resolve: (doc) => ({
    locations: [{ title: doc?.title, href: `/blog/${doc?.slug}` }]
  })
})
