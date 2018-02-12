# Example of retreiving image nodes from paths in js frontmatter

Using the [gatsby-transformer-javascript-static-exports](https://www.gatsbyjs.org/packages/gatsby-transformer-javascript-static-exports/) plugin allows us to add "frontmatter" to js files that can be targeted with GraphQL queries.

When paths to image files are included in the frontmatter, queries to them should return `ImageSharp` nodes. In practice however, this often produces an error with message `Path must be a string. Received undefined`.

In my experience the behavior is inconsistent. Sometimes the images are returned as expected. Sometimes my component receives the expected image nodes and renders properly, but running the same query in GraphiQL produces the error.

Often, making seemingly minor changes to the query produces a different outcome. For example, changing `sizes( quality: 90 )` to `sizes( quality: 80 )` may result in the expected behavior where before the error was produced. Stoping and restarting the development server with `gatsby develop` has similarly unpredictable results.

```
// specify frontmatter
exports.data = {
  title: 'First Post',
  coverImage: './cover-first-post.jpg'
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