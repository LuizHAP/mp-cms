import { useState, useEffect, useCallback } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Autocomplete, Card, Flex, Spinner, Text } from '@sanity/ui'

const AsyncSelect = (props: StringInputProps) => {
  const { value, onChange, schemaType } = props
  const { options } = schemaType
  const { url, formatResponse } = options as {
    url: string
    formatResponse: (data: any) => any
  } || {}

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getModels = async () => {
      if (!url) return

      setLoading(true)
      try {
        const response = await fetch(url)
        const rawData = await response.json()
        const formattedData = formatResponse ? formatResponse(rawData) : rawData
        setData(formattedData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getModels()
  }, [url, formatResponse])

  const handleChange = useCallback(
    (value: string) => {
      onChange(value ? set(value) : unset())
    },
    [onChange]
  )

  if (error)
    return (
      <Card tone="critical">
        <Text>There has been an error</Text>
      </Card>
    )

  if (!data || loading)
    return (
      <Card tone="default">
        <Spinner />
      </Card>
    )

  return (
    <Autocomplete
      options={data}
      value={value}
      onChange={handleChange}
      placeholder='Search for a model'
      id={props.id}
      renderOption={(option: any) => (
        <Card padding={2} style={{ cursor: 'pointer' }}>
          <Flex gap={2} align='center'>
            <img src={option.image || ''} alt={option.label || ''} style={{ width: 50, height: 50 }} />
            <Text>{option.label || ''}</Text>
          </Flex>
        </Card>
      )}
    />
  )
}

export default AsyncSelect