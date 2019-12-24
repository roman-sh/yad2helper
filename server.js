const request = require('request')
const axios = require('axios')
var schedule = require('node-schedule-tz')

const {transporter, mailOptions} = require('./mailer')
const {config} = require('./config')


console.log('...STARTING...')
console.log('process.env.RAICHY_PASS:', process.env.RAICHY_PASS)
sendMail()

schedule.scheduleJob('0 * * * *', () => {
    request(config, callback)
})

function callback(error, response, body_str) {
    if (!error && response.statusCode == 200) {
        const
            body = JSON.parse(body_str),
            feed_items = body.feed.feed_items,
            itemsFromSite = []

        feed_items.forEach(item => {
            if (item.ad_number) {
                itemsFromSite.push(item.ad_number)
            }
        })
        console.log('itemsFromSite:\n', itemsFromSite)

        axios.get('https://yad2helper-dd4dc.firebaseio.com/items.json')
            .then((res) => {
                console.log(`[axios.get] statusCode: ${res.status}`)
                if (!res.data) {
                    saveToDb(itemsFromSite)
                }
                else {
                    const key = Object.keys(res.data)[0]
                    const itemsFromDb = res.data[key]
                    console.log('itemsFromDb:\n', itemsFromDb)

                    const isUpToDate = itemsFromSite.every(el => {
                        return itemsFromDb.includes(el)
                    })
                    console.log('isUpToDate:', isUpToDate)

                    if (!isUpToDate) {
                        axios.delete('https://yad2helper-dd4dc.firebaseio.com/items.json')
                            .then(res => {
                                console.log('Items deleted from db')
                                saveToDb(itemsFromSite)
                                sendMail()
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }
                }
                // console.log(res)
            })
            .catch((error) => {
                console.error(error)
            })

    }
}

function saveToDb(items) {
    axios.post('https://yad2helper-dd4dc.firebaseio.com/items.json', items)
        .then((res) => {
            console.log(`[saveToDb] statusCode: ${res.status}`)
            // console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
}

function sendMail() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}


