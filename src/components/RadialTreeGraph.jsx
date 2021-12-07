import React from "react"
import ReactECharts from "echarts-for-react"

function RadialTreeGraph(props) {
  const { data } = props

  const convertDataToTreeSet = (data) => {
    if (Object.keys(data).length === 1) {
      const entries = Object.entries(data)
      return convertObjectToTree(entries[0][0], entries[0][1])
    }

    let newData = { name: data.name, children: [] }
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "object") {
        const objectTree = convertObjectToTree(key, value)
        newData.children.push(objectTree)
        continue
      }
    }
    return newData
  }

  const convertObjectToTree = (name, data) => {
    let newObjectTree = { name: name }
    if (!data || data.length < 1) return newObjectTree

    if (Array.isArray(data)) {
      let arrayTree = []
      data.forEach((item) => {
        arrayTree.push({ name: item })
      })

      if (arrayTree.length > 0) newObjectTree.children = arrayTree
    } else {
      let objectTree = []

      for (const [key, value] of Object.entries(data)) {
        objectTree.push(convertObjectToTree(key, value))
      }

      if (objectTree.length > 0) newObjectTree.children = objectTree
    }

    return newObjectTree
  }

  const treeData = convertDataToTreeSet(data)

  return (
    <ReactECharts
      style={{ height: "100%", padding: "10px" }}
      option={{
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          responsive: true,
        },
        series: [
          {
            type: "tree",

            data: [treeData],

            top: "-5%",
            bottom: "-5%",
            left: "20%",
            right: "20%",
            layout: "radial",

            symbol: "diamond",

            symbolSize: 13,
            initialTreeDepth: 5,

            animationDurationUpdate: 750,

            emphasis: {
              focus: "descendant",
            },
          },
        ],
      }}
    />
  )
}

export default RadialTreeGraph
