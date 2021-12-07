import React from "react"
import { Card, Elevation } from "@blueprintjs/core"

const isNode = (value) => typeof value === "object"

const getVisualizedToSite = (object, prefix) => {
  let result = ""
  Object.entries(object).forEach(([key, value], index, { length }) => {
    if (value && isNode(value)) {
      result += prefix + (index + 1 === length ? "└─ " : "├─ ") + key
      result += "\n"
      result += getVisualizedToSite(
        value,
        prefix + (index + 1 === length ? "   " : "│  ")
      )
    } else {
      result += prefix + (index + 1 === length ? "└─ " : "├─ ")
      if (value || value === 0) result += value
      result += "\n"
    }
  })
  return result
}

function NodeReport(props) {
  const { style, data } = props
  const jsonVisualizedSimple = getVisualizedToSite(data, "")
  return (
    <Card interactive={false} elevation={Elevation.FOUR} style={style}>
      <pre>{jsonVisualizedSimple}</pre>
    </Card>
  )
}

export default NodeReport
