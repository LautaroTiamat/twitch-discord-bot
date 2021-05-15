const getGeneralMsg = (msg, prefix) => {
    msg = msg.toLowerCase().trim();

    while(msg.includes('  ')) msg = msg.replace(/  /g, " ");

    return {
        command: msg.substr(prefix.length, msg.includes(' ') ? msg.indexOf(' ') - 1 : msg.length),
        content: msg.substr(msg.indexOf(' ') + 1)
    }
}

module.exports = { getGeneralMsg }