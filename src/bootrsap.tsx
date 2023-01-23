import React from 'react'
import ReactDOM from "react-dom/client"
import { Container, Layout } from './Views/Styles/LayoutStyle'
import { GlobalStyles } from 'twin.macro'
import { css } from '@emotion/react'
import AnimeList from 'AnimeListRemote/AnimeList'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
})

root.render(
  <ApolloProvider client={client}>
    <GlobalStyles 
      css={css`
        body {
          margin: 0;
        }`}
    />
    <Layout>
      <Container tw='rounded'>
        <AnimeList />
      </Container>
    </Layout>
  </ApolloProvider>

)
