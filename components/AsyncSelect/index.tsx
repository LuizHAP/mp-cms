import { useState, useEffect, useCallback } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Autocomplete, Card, Spinner, Text } from '@sanity/ui'

const BACKEND_URL = 'https://mp-website-git-feat-search-models-machinerypartner.vercel.app'
const API_URL = `${BACKEND_URL}/api/models`

const AsyncSelect = (props: StringInputProps) => {
  const { value, onChange } = props
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getModels = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setData(data.map((item: any) => ({
          label: item.model_slug,
          value: item.model_name,
        })))
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getModels()
  }, [])

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
      id={props.id}
    />
  )
}

export default AsyncSelect