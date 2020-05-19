const download = (url, res) => {
    console.log(url)
    res.download(url, '123123.pdf', (err) => {
        if(err) console.log('ошибка', err)
        else console.log('jnlf. afqk bkb ytn')
    })
}

module.exports = download;