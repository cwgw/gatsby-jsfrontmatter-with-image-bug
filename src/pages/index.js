import React from 'react'
import Link from 'gatsby-link'
import Image from 'gatsby-image'

import './index.css'

const IndexPage = props => {
  const Posts = props.data.allJsFrontmatter.edges.map(({ node }, index) => {
    const CoverImage = node.data.coverImage ? (
      <Image
        sizes={node.data.coverImage.childImageSharp.sizes}
        style={{ width: '150px' }}
      />
    ) : null

    return (
      <article className="post-list-item" key={index}>
        {CoverImage}
        <header>
          <h2>
            <Link to={node.data.path}>{node.data.title}</Link>
          </h2>
          <p>{node.data.description}</p>
        </header>
      </article>
    )
  })

  return (
    <div>
      <h1>Using image paths with JsFrontmatter</h1>
      <p>Every post item in the list below should contain an image.</p>
      <div className="post-list">{Posts}</div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query posts {
    allJsFrontmatter(sort: { fields: [data___written], order: DESC }) {
      edges {
        node {
          data {
            title
            written
            path
            description
            coverImage {
              childImageSharp {
                sizes(maxWidth: 150, quality: 90) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
