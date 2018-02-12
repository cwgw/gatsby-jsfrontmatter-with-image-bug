/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (node.internal.type === `JSFrontmatter`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const mdInsetPage = path.resolve(`src/templates/mdInsetPage.js`)
    const mdBlogPost = path.resolve(`src/templates/mdBlogPost.js`)

    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
          {
            allJsFrontmatter {
              edges {
                node {
                  fileAbsolutePath
                  data {
                    path
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          console.log(result)
          reject(result.errors)
        }

        result.data.allJsFrontmatter.edges.forEach(edge => {
          let frontmatter = edge.node.data
          createPage({
            path: frontmatter.path,
            component: path.resolve(edge.node.fileAbsolutePath),
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })

        return
      })
    )
  })
}