const headers = {
    'Connection': 'keep-alive',
    'X-MOD-SBB-CTYPE': 'xhr',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Referer': 'https://www.yad2.co.il/realestate/rent?city=3000&neighborhood=514',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cookie': 'likedItemsNum=19; y2018-2-cohort=6; __uzma=63b07067-6bcd-4f57-b4a5-c9432133ea92; __uzmb=1576374877; abTestKey=46; yad2upload=1073741834.27765.0000; use_elastic_search=1; y2_cohort_2020=97; historyprimaryarea=jerusalem_area; historysecondaryarea=jerusalem_area_and_surroundings; SPSI=9a909c698cfd327186cf92efca13e960; UTGv2=h4662f48af6f3ba50f4136d599cee19da848; yad2_session=JtoLHb6dwXbKlqooC4CDZawZ6aLgyuhAIG3FZDso; spcsrf=d8cdb94cf166dcb9d27178920fca12f4; sp_lit=z0kRslK7wr7mZg9dmzWuuw==; PRLST=Cn; favorites_userid=djg2020449962; adOtr=9EaL99986fc; __uzmd=1577130800; __uzmc=3869216060314'
}

const config = {
    url: 'https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/rent?city=3000&neighborhood=514&compact-req=1&forceLdLoad=true',
    headers: headers
}

exports.config = config