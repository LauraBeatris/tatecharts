import { Select } from '@chakra-ui/react'

export function ChartTargetSelect () {
  return (
    <Select placeholder='Chart target' size='xs' defaultValue='global'>
      <option value='global'>Global</option>
    </Select>
  )
}
