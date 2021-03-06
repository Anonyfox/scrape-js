import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Opengraph } from '../../../lib/dom/head/opengraph'

@suite(timeout(100), slow(10))
class DomHeadOpengraphTest {
  @test
  public worksWithDefaultHTML() {
    const input = `<html>
      <head>
        <meta property="og:title" content="OGP Title">
        <meta property="og:description" content="OGP Description">
        <meta property="og:image" content="OGP Image">
        <meta property="og:site_name" content="OGP Site">
      </head>
      <body></body>
    </html>`
    const ogp = new Opengraph(cheerio.load(input)).toJSON()
    expect(ogp.title).to.be.equal('OGP Title')
    expect(ogp.description).to.be.equal('OGP Description')
    expect(ogp.image).to.be.equal('OGP Image')
    expect(ogp.site).to.be.equal('OGP Site')
  }
}
