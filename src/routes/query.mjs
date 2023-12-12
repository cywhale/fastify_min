export default async function query (fastify, opts, next) {
  fastify.get('/query', async function (req, reply) {
    const testUrl = 'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetCapabilities'
    fastify.log.info("test query: ", testUrl)
    try {
      const res = await fetch(testUrl)
      if (!res.ok) {
        const errorBody = await res.text()  // Try to read the response body
        throw new Error(`Request failed with status ${res.status}: ${errorBody}`)
      }

      const xml = await res.text()
      //let jbody = parse(xml, { arrayMode: false })
      return xml //jbody

    } catch (err) {
      fastify.log.error(`Fetch error: ${err.message}`)
      throw new Error(`Fetch error: ${err.message}`)
    }

    reply.send(xml)
  })

  next()
}

