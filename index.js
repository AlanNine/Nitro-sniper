const Discord = require("discord.js");
const axios = require('axios').default;

const client = new Discord.Client();
const {
    token
} = require("./config.json");



client.on('ready', () => {
    console.log(`Procurando nitros para você...`);
});

client.on('message', message => {
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        console.log(`Nitro encontrado em: ${message.guild.name}`);
        
        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`, 
            headers: 
            {
            'Authorization': token 
            }
        }).then(
            () => console.log(`Resgatado com sucesso em: ${message.guild.name}`)
        ).catch(ex => console.log(`Erro | Falha ao reivindicar Nitro`))
    }
})

client.login(token)