
async function main(){
  await fetch(`https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js`).then(e=>e.text()).then(eval)
  var a = CryptoJS.AES.encrypt('id=34354&startTime=1721122200000&endTime=1721124000000&resourceTypeCode=badminton&batchBook=false','3534929/Er8JFNfqxWttiX6Mo1Ky').toString()
  var b = CryptoJS.AES.decrypt('U2FsdGVkX1+FG3lZgn1NmssxtRTpXCpJ9N7q1PeuFIcTZSm/rYp3CsaFNl8PUIDS3Q/P85MOZRl8KFwfO5s7zsFBmix/cpf5WPWpGIF+sMWnQeHapoVCn8YDSfe/kwbD0EG1PXtsZpOvFaFMQ+lu0T/kUQ65c5uDN2TO1KeuHR0=','3534929/Er8JFNfqxWttiX6Mo1Ky').toString(CryptoJS.enc.Utf8)
  console.log(a, b)
}

main()
