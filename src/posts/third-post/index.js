import React from 'react'
import Image from 'gatsby-image'

exports.data = {
  title: `Third Post`,
  written: `2018-01-03`,
  path: `third-post`,
  description: `Sit tibique temporibus no, id eam magna dicant.`,
  coverImage: './cover-third-post.jpg',
}

const ThirdPost = props => {
  const data = props.data.jsFrontmatter.data

  const CoverImage = data.coverImage ? (
    <Image
      sizes={data.coverImage.childImageSharp.sizes}
      style={{ width: '300px', float: 'left', marginRight: '1rem' }}
    />
  ) : null

  return (
    <article>
      <header>
        <h1>{data.title}</h1>
      </header>
      <div>
        {CoverImage}
        <p>
          Lorem ipsum dolor sit amet, fabulas suscipiantur intellegebat in mel,
          simul verterem no usu. Minimum conclusionemque eos id. Eu enim
          fastidii nam, has denique luptatum no, nonumes corrumpit in has.
          Detraxit maiestatis mea ad.
        </p>
        <p>
          Vix essent praesent ei, meliore appareat definiebas est cu, justo
          option pertinax cum at. Usu quod integre senserit cu, per consul
          vocibus eu.
        </p>
        <p>
          Sit tibique temporibus no, id eam magna dicant. Facete viderer vix cu,
          posse copiosae est ei. Quo an lorem munere. Debet probatus eam eu, in
          eam commodo appellantur.
        </p>
      </div>
    </article>
  )
}

export default ThirdPost

export const pageQuery = graphql`
  query thirdPostContent($slug: String!) {
    jsFrontmatter(fields: { slug: { eq: $slug } }) {
      data {
        title
        path
        coverImage {
          childImageSharp {
            sizes(maxWidth: 300, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
