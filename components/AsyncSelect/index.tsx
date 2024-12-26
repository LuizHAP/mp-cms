import { useState, useEffect } from 'react'

const AsyncSelect = (props: any) => {
  const [listItems, setListItems] = useState([])
  const { schemaType, renderDefault } = props
  const { options } = schemaType
  const { url, formatResponse } = options

  useEffect(() => {
    const getCats = async () =>
      fetch(url)
        .then((res) => res.json())
        .then(formatResponse)
        .then(setListItems)

    getCats()
  }, [url, formatResponse])

  return renderDefault({
    ...props,
    schemaType: { ...schemaType, options: { ...options, list: listItems } },
  })
}

export default AsyncSelect