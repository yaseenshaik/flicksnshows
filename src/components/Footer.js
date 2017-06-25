import React from 'react'
import { Container, Grid, Icon, Segment } from 'semantic-ui-react'

const muted = {
  color: 'rgba(255,255,255,.8)'
}

export default () =>
  <Segment padded inverted style={{ marginTop: -14, borderRadius: 0 }}>
    <Container text>
      <Grid textAlign="center" inverted stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Icon name="mail" />
            <a style={muted} href="mailto:flicksnshows@codecara.ml">
              flicksnshows@codecara.ml
            </a>
          </Grid.Column>
          <Grid.Column>
            <Icon name="power cord" />
            <a
              style={muted}
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.themoviedb.org/"
            >
              Powered by TMDb
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
