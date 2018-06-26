import elasticsearch = require('elasticsearch');

const start = async () => {
    const client = new elasticsearch.Client({
        host: 'localhost:9200'
    });
    await client.ping({ requestTimeout: 300000 });
    console.log('pinged server');
    const query = 'London';
    const resp = await client.search({
        index: 'osm',
        type: 'place',
        body: {
            sort: [
                {
                    place_rank_num: { order: 'desc' },
                    importance_num: { order: 'desc' }
                }
            ],
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                name: query
                            }
                        },
                        {
                            match: {
                                alternative_name: query
                            }
                        }
                    ]
                }
            }
        }
    });
    const { hits } = resp.hits;
    console.log(hits);
};

start();
