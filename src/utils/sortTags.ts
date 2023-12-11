// format to {tag,checked} and sort them
const sortTags = (arr: { tag: string; checked: boolean }[] | []) => {
  const formated = arr.sort(
    (a: { tag: string; checked: boolean }, b: { tag: string; checked: boolean }) => {
      const tagA = a.tag.toUpperCase() // ignore upper and lowercase
      const tagB = b.tag.toUpperCase() // ignore upper and lowercase
      if (tagA < tagB) {
        return -1
      }
      if (tagA > tagB) {
        return 1
      }
      return 0
    }
  )
  return formated
}

export default sortTags
