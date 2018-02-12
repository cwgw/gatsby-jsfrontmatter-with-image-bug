# Example of retreiving image nodes from paths in js frontmatter

Using the [gatsby-transformer-javascript-static-exports](https://www.gatsbyjs.org/packages/gatsby-transformer-javascript-static-exports/) plugin allows us to add "frontmatter" to js files that can be targeted with GraphQL queries.

When paths to image files are included in the frontmatter, queries to them should return `ImageSharp` nodes.

```
// specify frontmatter
exports.data = {
  title: 'First Post',
  cover: './cover-first-post.jpg'
}
```
```
// query frontmatter
{
  allJsFrontmatter {
    edges {
      node {
        data {
          title
          coverImage {
            childImageSharp {
              id
            }
          }
        }
      }
    }
  }
}
```
```
// frequent error
{
  "errors": [
    {
      "message": "Path must be a string. Received undefined",
      "locations": [
        {
          "line": 7,
          "column": 11
        }
      ],
      "path": [
        "allJsFrontmatter",
        "edges",
        0,
        "node",
        "data",
        "coverImage"
      ]
    }
    ...
```