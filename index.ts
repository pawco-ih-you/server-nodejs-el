import elasticsearch = require('elasticsearch')

const start = async () => {
    const client = new elasticsearch.Client({
        host: 'localhost:9200',
    })
    await client.ping({requestTimeout: 300000})
    console.log('pinged server')
}

start()
