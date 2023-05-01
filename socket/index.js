let scrapper = require('../utils/scrape');

 
const socketMain = (io, socket) => {
    //on initial connection---------
    socket.on('initialData', data => initialConnection(socket, data))
}

const initialConnection = async(socket, data) => {
    let { url, site, event } = data

    scrapper(url, site, event)
    .then(data => {
        console.log(data)
        socket.emit('fixtures', data)
    })
    .catch(error => {
        console.log(error)
        socket.emit('error', error)
    })

    // try {
    //     const data = await scrapper(url, site, event)
    //     console.log(data)
    //     socket.emit('fixtures', data)
    // } catch (error) {
    //     console.log(error)
    //     socket.emit('error', error)
    // }
}


module.exports = socketMain;