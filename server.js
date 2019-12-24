const request = require('request')
const axios = require('axios')
const schedule = require('node-schedule-tz')

// const {transporter, mailOptions} = require('./mailer')
const {nexmo, from, to, text} = require('./sms')
const {config} = require('./config')


console.log('...APP STARTED...')

schedule.scheduleJob('0 * * * *', () => {
    console.log('...RUNNING scheduleJob...')
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
                    console.log('Db is empty. Adding items...')
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
                                sendSms()
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
    else console.error(error)
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

function sendSms() {
    console.log('Sending SMS...')
    nexmo.message.sendSms(from, to, text)
}

// function sendMail() {
//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.error(error)
//         } else {
//             console.log('Email sent: ' + info.response)
//         }
//     })
// }




