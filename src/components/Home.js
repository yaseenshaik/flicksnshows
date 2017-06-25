import React from 'react'
import { Header, Grid, Divider, Segment } from 'semantic-ui-react'
import Footer from './Footer'

export default () =>
  <Segment inverted style={{ marginTop: -30, borderRadius: 0 }}>
    <Grid
      style={{ height: 'calc(100vh - 118px)', minHeight: 500 }}
      verticalAlign="middle"
      centered
      inverted
    >
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" size="huge" icon textAlign="center" inverted>
            Movies, Shows, Reviews
            <Divider horizontal hidden />
            <Header.Subheader>
              Find Popular Movies and Shows, Watch trailers, Add them to your
              favorites
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Footer />
  </Segment>
