export const formatDate = date => {
  let tempDate = new Date(date)
  let YYYY = tempDate.getFullYear()
  let MM = (tempDate.getMonth() + 1).toString().padStart(2, '0')
  let DD = tempDate.getDate().toString().padStart(2, '0')
  let hh = tempDate.getHours().toString().padStart(2, '0')
  let mm = tempDate.getMinutes().toString().padStart(2, '0')
  let ss = tempDate.getSeconds().toString().padStart(2, '0')

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}
