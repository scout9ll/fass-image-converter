const sqip = require('sqip').default

async function primitiveImage(localfile) {
    const pluginResults = await sqip({
        input: localfile,
        width: 0,
        plugins: [
            {
                name: 'sqip-plugin-primitive',
                options: {
                    numberOfPrimitives: 100,
                    mode: 2,
                },
            },
            // 'pixels', 'svgo', 'data-uri',
        ],
    })
    console.log(pluginResults);

    return pluginResults.content
}

module.exports =  primitiveImage 