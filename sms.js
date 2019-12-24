const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret
})

const from = 'yad2helper'
const to = '972546313551'
const text = 'New item is available'

exports.nexmo = nexmo
exports.from = from
exports.to = to
exports.text = text