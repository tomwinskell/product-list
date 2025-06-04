import { TextInput } from "flowbite-react"

export const SearchInput = () => {
  return (
    <TextInput
      id="base"
      type="text"
      sizing="md"
      placeholder="Search..."
      className="w-auto md:w-md lg:w-xl"
    />
  )
}
