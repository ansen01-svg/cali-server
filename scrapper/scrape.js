let puppeteer = require('puppeteer');
let { 
   live1xBetdata, upcoming1xBetData, upcoming22BetData, live22BetData
} = require('./callbacks');


let scrapper = async(url, site, event) => {
    let browser = await puppeteer.launch({ 
        headless : true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    let page = await browser.newPage()
    await page.setDefaultTimeout(16000)

    //for upcoming 22bet events-----------------
    if (site === '22bet' && event === 'Upcoming'){
        await page.goto(url)

        let result = await page.evaluate(upcoming22BetData)

        await browser.close()
        return result;
    }
    //for live 22bet events---------------------
    else if (site === '22bet' && event === 'Live'){
        await page.goto(url)
    
        let result = await page.evaluate(live22BetData)

        await browser.close()
        return result;
    }
    //for upcoming 1xbet events-----------------
    else if (site === '1xBet' && event === 'Upcoming'){
        await page.goto(url, { waitUntil : 'networkidle0' })
    
        let result = await page.evaluate(upcoming1xBetData)
    
        await browser.close()
        return result;
    }
    //for live 1xbet events----------------------
    else {
        await page.goto(url, { waitUntil : 'networkidle0' })

        let result = await page.evaluate(live1xBetdata)

        await browser.close()
        return result;
    }
}


module.exports = scrapper;