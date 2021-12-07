export const stylingObject = {
    sidebar: {
        gridArea: "sidebar",
        justifySelf: "start"
    },

    content: {
        gridArea: "content",
    },
    wrapper: {
        display: "grid",
        gridGap: "10px",
        gridTemplateColumns: "auto auto",
        gridTemplateAreas:
            `"sidebar content"
            "sidebar content"
            "sidebar content"`,
    },
    image: {
        width: "100%",
        height: "auto"
    }
}
