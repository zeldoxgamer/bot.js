const Discord = require('discord.js');
const fs = require('file-system');
const client = new Discord.Client();

client.on('ready', () => {

  client.user.setGame (`+help | +inv | ser ${client.guilds.size}| user ${client.users.size}`,'https://www.twitch.tv/peery13');

  console.log('---------------');

  console.log(' Bot Is Online')

  console.log('---------------')
 
 console.log('by zeldox55')

});



 let prefix = '+'; 


const ms = require("ms");
  client.on("message", message => {
 if(!message.channel.guild) return;  
  if (message.author.bot) return;
 
  let command = message.content.split(" ")[0];
 
  if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
  if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
 
  if (message.guild.member(user).removeRole(muteRole.id)) {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
  } else {
    message.guild.member(user).removeRole(muteRole).then(() => {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
    });
  }
 
};
 
});


client.on('message',function(message) {

 if(!message.channel.guild) return;    let messageArray = message.content.split(' ');

    let muteRole =  message.guild.roles.find('name', 'Muted');

    let muteMember = message.mentions.members.first();

    let muteReason = messageArray[2];

    let muteDuration = messageArray[3];

 if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {

           

  if (message.author.bot) return;

       if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));

       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send('ليست لديك رتبة لاعطاء ميوت');

       if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' ليست لدي البرمشن');

       if(!muteMember) return message.channel.send(' المرجوا منشنت الشخص').then(message => message.delete(4000))

       if(!muteReason) return message.channel.send(' المرجو كتابة سبب الميوت').then(message => message.delete(4000))

       if(!muteDuration) return message.channel.send(' المرجو منك وضع مدة الميوت`` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))

       if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' لقد تم اعطائه ميوت سابقا').then(message => message.delete(4000))

       message.channel.send(`لقد تم اعطاء${muteMember} ميوت 🤐  .`).then(message => message.delete(5000))

       muteMember.addRole(muteRole);

       muteMember.setMute(true)

       .then(() => { setTimeout(() => {

           muteMember.removeRole(muteRole)

           muteMember.setMute(false)

       }, mmss(muteDuration));

       });

   }

});
 




client.on('message',async message => {
    const moment = require('moment');
const ms = require('ms')
    var prefix = '+' //بريفكس البوت
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
 
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "gstart")) {
 
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');
    message.channel.send(`:eight_pointed_black_star:| **Send Name channel For the Giveaway**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send(':heavy_multiplication_x:| **i Found It :(**');
        room = collected.first().content;
        collected.first().delete();
        msg.edit(':eight_pointed_black_star:| **Time For The Giveaway**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**The Bot Not Support This Time**');
            duration = collected.first().content
            collected.first().delete();
            msg.edit(':eight_pointed_black_star:| **Now send The Present **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setDescription(`**${title}** \nReact With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  .setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find("name" , room).send(' :heavy_check_mark: **Giveaway Created** :heavy_check_mark:' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('Giveaway Ended !🎉',`Winners : ${gFilter} \nEnded at :`)
                       .setTimestamp()
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                    message.guild.channels.find("name" , room).send(`**Congratulations ${gFilter}! You won The \`${title}\`**` , {embed: {}})
                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **i Don't Have Prem**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});


client.on("message", message => {
    var prefix = "+";
 
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "clear")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('? | **ليس لديك الصلاحيه حتى تمسح الشات**');
        var msg;
        msg = parseInt();
      
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تم مسح الشات",
        color: 0x06DF00,
        description: "تم المسح„ ",
        footer: {
          text: "آ©Ghost"
        }
      }}).then(msg => {msg.delete(3000)});
                          }

     
});
 



  
   
      
      
      
          
	
        
    
          
    
        
    






 const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  let banse = new Set();
  client.on('guildBanAdd', function(guild) {
    guild.fetchAuditLogs().then(logs => {
      const ser = logs.entries.first().executor;
      if(!bane[ser.id+guild.id]) bane[ser.id+guild.id] = {
        bans: 2
      }
      let boner = bane[ser.id+guild.id]
  banse.add(ser.id)
  boner.bans = Math.floor(boner.bans+1)
 
 
  setTimeout(() => {
    boner.bans = 2
    banse.delete(ser.id)
  },8000)
 
  if(boner.bans > 2) {
    let roles = guild.members.get(ser.id).roles.array()
  guild.members.get(ser.id).removeRoles(roles)
  }
 
      })
      fs.writeFile('./alpha.json', JSON.stringify(bane), (err) => {
  if (err) console.error(err);
  })
 
  })
  client.on('guildMemberRemove', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `MEMBER_KICK`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {  
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          })
      };
      });
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  });
  client.on('roleDelete', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `ROLE_DELETE`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          },60000)
      };
      });
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  });
  client.on('channelDelete', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `CHANNEL_DELETE`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          })
      };
      });
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  })



 
 


client.on('message',async message => {

 

let mention = message.mentions.members.first();

 

let Room = client.channels.get('465568307370786817'); // ايدي الروم

 

if(message.content.startsWith(prefix + "رفض")) {

 

if(message.guild.id !== '461567758518452247') return; //ايدي السيرفر

 

 if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("**للأسف ليس لديك صلاحية**").then(msg => msg.delete(5000));

 

 

if(!mention) return message.reply("منشن شخص");

 

 

 

Room.send(`

**» العضو :** ${mention}

[ ❌ ] :: لقد تم رفض العضو`);

 

}

 

});






client.on('message', async (message) => {

  if(message.content.startsWith("+تقديم")) {

    await message.channel.send("** ما لغتك؟**").then(e => {

    let filter = m => m.author.id === message.author.id

    let lan = '';

    let md = '';

    let br = '';

    let chaLan = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })

      .then(collected => {

        lan = collected.first().content

        collected.first().delete()

        e.delete();

        message.channel.send('** ما خبرتك؟**').then(m => {

        let chaMd = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })

          .then(co => {

            md = co.first().content

            co.first().delete()

            m.delete();

            message.channel.send('**وش الفرق بين const و var**').then(ms => {

            let br = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })

              .then(col => {

                br = col.first().content

                col.first().delete()

                ms.delete()

                message.channel.send('جاري التقديم ..').then(b => {

                setTimeout(() => {

                  b.edit(`**تم التقديم وسيتم الرد فـ اقرب وقت**`)

                },2000);

                var gg = message.guild.channels.find('name', 'التقديم')

                if(!gg) return;

                if(gg) {

                  gg.send({

                      embed : new Discord.RichEmbed()

                      .setDescription(`** اللغة ❓ : \n ${lan}\nالخبرة 🔗 :\n ${md} \nالفرق بين const,var ❓ :\n ${br} \nتم التقديم بواسطة : <@${message.author.id}> **`)

                      .setFooter(`ام سيرفرك`)

                      .setTimestamp()

                    });

                  }

                })

              })

            })

          })

        })

      })

    })

  }

})
 
 

   

client.on('message',async message => {

 

let mention = message.mentions.members.first();

 

let Room = client.channels.get('465568307370786817'); //ايدي الروم

 

if(message.content.startsWith(prefix + "قبول")) {

 

if(message.guild.id !== '461567758518452247') return; // ايدي السيرفر

 

 if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("**للأسف ليس لديك صلاحية**").then(msg => msg.delete(5000));

 

 

if(!mention) return message.reply("منشن شخص");

 

 


Room.send(`

**» العضو :** ${mention}

[ ✅ ] :: لقد تم قبول العضو واعطائه رتبة سبورت`);
 }
});
	
		
 
 const code = '+';//prefix

 

client.on('message',async message => {

    if(message.content.startsWith(code + "js")) {

  if(!message.channel.guild) return message.reply('This Command For Servers Only !');

          if(message.channel.name !== 'sharejs') return message.reply('يجب كتابه الامر في روم باسم sharejs')

    let jscodes = message.guild.channels.find(`name`, "codes-js");

    if(!jscodes) return message.channel.send(":x:لم اجد الروم الخاص بنشر الاكواد");

      let filter = m => m.author.id === message.author.id;

      let thisMessage;

      let thisFalse;

      message.channel.send(':pencil: **| من فضلك اكتب الكود الأن... :pencil2: **').then(msg => {

 

      message.channel.awaitMessages(filter, {

        max: 1,

        time: 90000,

        errors: ['time']

      })

      .then(collected => {

        collected.first().delete();

        thisMessage = collected.first().content;

        let boi;

        msg.edit(':scroll: **| من فضلك اكتب وصف الكود الأن... :pencil2: **').then(msg => {

 

            message.channel.awaitMessages(filter, {

              max: 1,

              time: 90000,

              errors: ['time']

            })

            .then(collected => {

              collected.first().delete();

              boi = collected.first().content;

              let boi2;

              msg.edit(':man_in_tuxedo: **| من فضلك اكتب من صنع هذا الكود الأن... :pencil2: **').then(msg => {

 

                message.channel.awaitMessages(filter, {

                  max: 1,

                  time: 90000,

                  errors: ['time']

                })

                .then(collected => {

                  collected.first().delete();

                boi2 = collected.first().content;

        msg.edit(':shield: **| [ هل انت متأكد من نشر الكود؟ | [ نعم ] او [ لا**');

   message.channel.awaitMessages(response => response.content === 'نعم' || 'لا' && filter,{

          max: 1,

          time: 90000,

          errors: ['time']

        })

        .then(collected => {

          if(collected.first().content === 'لا') {

            msg.delete();

            message.delete();

            thisFalse = false;

          }

          if(collected.first().content === 'نعم') {

            if(thisFalse === false) return;

            msg.edit(':dove: **| Done :white_check_mark:, تم بنجاح نشر كودك في روم الاكواد**');

            collected.first().delete();

            jscodes.send(`@everyone | @here

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

**${message.guild.name}© :arrow_down:**            

\`\`\`js

${thisMessage}\`\`\`

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

**وصف الكود**: ${boi}

**تم النشر بواسطة**: ${message.author}

**المصدر / الشخص الذي صنع الكود**: ${boi2}`);

          }

        }

    );

});

      });

    }

      );

    });

}

);

      })}});






client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله ${args}`)
.setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))
 
let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
 
let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
 
 
EmbedBc.on("collect", r => {
 
message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});








client.on('message', function(message) {

    if(message.content.startsWith(prefix + 'roll')) {

        let args = message.content.split(" ").slice(1);

        if (!args[0]) {

            message.channel.send('**حط رقم معين يتم السحب منه**');

            return;

            }

    message.channel.send(Math.floor(Math.random() * args.join(' ')));

            if (!args[0]) {

          message.edit('1')

          return;
   
        }

    }

});           

 


const welcome = JSON.parse(fs.readFileSync('./welcomer.json' , 'utf8'));
 
client.on('message', message => {
           if (!message.channel.guild) return;
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setWelcomer")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Welcome Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
welcome[message.guild.id] = {
channel: room,
onoff: 'On',
by: 'On',
dm: 'Off'
}
fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
if (err) console.error(err)
})
    }})
client.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleWelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          onoff: 'Off'
        }
          if(welcome[message.guild.id].onff === 'Off') return [message.channel.send(`**The Welcome Is __𝐎𝐍__ !**`), welcome[message.guild.id].onoff = 'On']
          if(welcome[message.guild.id].onoff === 'On') return [message.channel.send(`**The Welcome Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].onoff = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
       
        client.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleDmwelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          dm: 'Off'
        }
          if(welcome[message.guild.id].dm === 'Off') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐍__ !**`), welcome[message.guild.id].dm = 'On']
          if(welcome[message.guild.id].dm === 'On') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].dm = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
 
        client.on('message', message => {
 
            if(message.content.startsWith(prefix + "toggleInvitedby")) {
                if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
                if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
                if(!welcome[message.guild.id]) welcome[message.guild.id] = {
                  by: 'Off'
                }
                  if(welcome[message.guild.id].by === 'Off') return [message.channel.send(`**The Invited By Is __𝐎𝐍__ !**`), welcome[message.guild.id].by = 'On']
                  if(welcome[message.guild.id].by === 'On') return [message.channel.send(`**The Invited By Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].by = 'Off']
                  fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                    if (err) console.error(err)
                    .catch(err => {
                      console.error(err);
                  });
                    })
                  }
                 
                })
               
 
client.on("guildMemberAdd", member => {
            if(!welcome[member.guild.id]) welcome[member.guild.id] = {
          onoff: 'Off'
        }
        if(welcome[member.guild.id].onoff === 'Off') return;
    let welcomer = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});
      }})
 
 
client.on('guildMemberAdd',async member => {
            if(!welcome[member.guild.id]) welcome[member.guild.id] = {
          onoff: 'Off'
        }
    if(welcome[member.guild.id].onoff === 'Off') return;
    const Canvas = require('canvas');
    const jimp = require('jimp');
    const w = ['./welcome_4.png'];
          let Image = Canvas.Image,
              canvas = new Canvas(800, 300),
              ctx = canvas.getContext('2d');
          ctx.patternQuality = 'bilinear';
          ctx.filter = 'bilinear';
          ctx.antialias = 'subpixel';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.stroke();
          ctx.beginPath();
   
          fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
              if (err) return console.log(err);
              let BG = Canvas.Image;
              let ground = new Image;
              ground.src = Background;
              ctx.drawImage(ground, 0, 0, 800, 300);
   
  })
   
                  let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                  jimp.read(url, (err, ava) => {
                      if (err) return console.log(err);
                      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                   if (err) return console.log(err);
   
            ctx.font = '36px Arial';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(member.user.username, 545, 177);
           
            ctx.font = '16px Arial Bold';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
           
            let Avatar = Canvas.Image;
            let ava = new Avatar;
            ava.src = buf;
            ctx.beginPath();
            ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(ava, 36, 21, 260, 260);
             
            let c = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
            if(!c) return;
            c.sendFile(canvas.toBuffer());
   
  });
  });
  });
 
  const invites = {};
 
const wait = require('util').promisify(setTimeout);
 
client.on('ready', () => {
  wait(1000);
 
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
 
client.on('guildMemberAdd', member => {
                    if(!welcome[member.guild.id]) welcome[member.guild.id] = {
                  by: 'Off'
                }
    if(welcome[member.guild.id].by === 'Off') return;
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === `${welcome[member.guild.id].channel}`);
    if(!logChannel) return;
      setTimeout(() => {
    logChannel.send(`Invited By: <@${inviter.id}>`);
  },2000)
  });
});
 
client.on("guildMemberAdd", member => {
                    if(!welcome[member.guild.id]) welcome[member.guild.id] = {
                  dm: 'Off'
                }
        if(welcome[member.guild.id].dm === 'Off') return;
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose:
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `)
}).catch(console.error)
})







client.on('message', message => {
    if (message.content.startsWith("+invites")) {
      if(!message.member.hasPermission('SEND_MESSAGES')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `SEND_MESSAGES`' )      .then(m => m.delete(5000));
    message.guild.fetchInvites()
    .then(invites => message.channel.send(`:scroll:  عدد دعواتك لهدا السيرفر هو[${invites.find(invite => invite.inviter.id === message.author.id).uses}].`))
         
    }
});

    
client.on('message', message => {
    if (!message.guild) return; 
    if (message.content.startsWith("رابط")) {

        message.channel.createInvite({
        thing: true,
        maxUses: 1,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send(`** تم أرسال الرابط برسالة خاصة **`)

      message.author.send(`**هذا الرابط لشخص واحد و لمدة 24 ساعة **`)
    }
});
 
 

  
 




client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "+mcskins") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send("** Type your skin name **");
        const image = new Discord.Attachment(`https://visage.surgeplay.com/full/512/${args}`, "skin.png");
    message.channel.send(image)
        }
    });

            

	

		 










                          
                          
    var i = {}
client.on('message', message =>{
var ch = i[message.channel.id]
if(!ch) ch = -1
ch++
while(ch >= 200){
message.channel.fetchMessages({limite:100}).then(msgs=>{
     msgs.channel.bulkDelete(msgs);
     });
message.channel.fetchMessages({limite:100}).then(msgs=>{
     msgs.channel.bulkDelete(msgs);
     });
ch = -1
}
});                      

            







client.on('message', message => {

  var prefix = "+";

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;



  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "+kick") {

      if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You Dont Have **KICK_MEMBERS** Permission!');

        var member= message.mentions.members.first();

        member.kick().then((member) => {

            message.channel.send(member.displayName + " Kicked From " + message.guild.name);

            message.channel.send("By: " + "<@" + message.author.id + ">")

            message.channel.sendMessage(`تم حفظ السبب وستتم مراجعته من قبل الأونر`)

client.channels.get(`ID Chat admin`).sendMessage("** تم طرد هذا الشخص من قبل " + message.guild.owner + " سبب مذكور **" + args.join("  "))

        }).catch(() => {

            message.channel.send(`:x: I cant kick this member`);

        });

    }

});







    













client.on("message", message => {    

          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === "+ser-av"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`صور���� ** ${message.guild.name} **`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor('RANDOM')
    .setImage(message.guild.iconURL)

   message.channel.send({embed});
      }
  });


client.on('message', message => {
     if (message.content === "+bot") {
            if(!message.channel.guild) return message.reply('** This command only for servers **');
     let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField("**عدد السيرفرات الي فيها البوت:**" , client.guilds.size)
  .addField("**المستخدمين:**", client.users.size)
  .addField("**قنوات:**", client.channels.size)
  .setTimestamp()
message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('+pes15')){
 if(!message.author.id === '324672376455299074') return;
message.channel.sendMessage('تم , جار أرسال الرسالة')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
})
    
            
	     
client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='+member')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL) 
      .setTitle('🌷| Members info')
      .addBlankField(true)
      .addField('📗| Online',
      `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
      .addField('📕| DND',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
      .addField('📙| Idle',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
      .addField('📓| Offline',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
      .addField('➡| Server Members',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
	
    });





client.on("guildDelete", guild => {
console.log(`**The King Bot** Leave From Server -- = ${guild.name} = -- , Server Owner -- = ${guild.owner.user.username} = --`)
client.channels.get("390983810889678868").send('**The King Bot** ``Kicked`` From Server - -- = '+`**${guild.name}**`+' = -- '+'**Server Owner** -- =' +`**${guild.owner.user.username}**` +'= --')
});

client.on("guildCreate", guild => {
client.channels.get("390983810889678868").send(`**The King Bot** has been **added** ❤ from this server **(${guild.name})** , Server Owner 👑 **(${guild.owner.user.username})**`)
});

client.on("guildDelete", guild => {
client.channels.get("390983810889678868").send(`**The King Bot** has been **removed** 😔 from this server **(${guild.name})** , Server Owner 👑 **(${guild.owner.user.username})**`)
});

client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
      guild.owner.send(embed)
});


   
       
     

  
client.on("message", (message) => {
if (message.content.startsWith("+ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});


client.on("message", (message) => {
if (message.content.startsWith("+cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});

      client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith('+ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms :signal_strength: ")
                        .addField('**WebSocket:**',api + " ms :signal_strength: ")
         message.channel.send({embed:embed});
                        }
                    });

client.on('message', message => {
    if (message.content.startsWith("+avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});




 
        
      

  



client.on("message", msg => {
       if (msg.content.startsWith(prefix + "id")) {
      const embed = new Discord.RichEmbed();
  embed.addField(":trident:|Username", `${msg.author.username}#${msg.author.discriminator}`, true)
          .addField(":id:|iD", `${msg.author.id}`, true)
          .setColor("RANDOM")
          .setFooter(msg.author.username , msg.author.avatarURL)
          .setThumbnail(`${msg.author.avatarURL}`)
          .setTimestamp()
          .setURL(`${msg.author.avatarURL}`)
          .addField(':name_badge:|Status', `${msg.author.presence.status.toUpperCase()}`, true)
          .addField(':game_die:|Playing', `${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name}`, true)
          .addField(':medal:|Roles', `${msg.member.roles.filter(r => r.name).size}`, true)
          .addField(':name_badge:|Discriminator', `${msg.discriminator}`, true)
          .addField(':date:|Created At', `${msg.createdAt}`,true)
          .addField(':robot:|Bot', `${msg.author.bot.toString().toUpperCase()}`, true);
      msg.channel.send({embed: embed})
  }
});


const nicks = JSON.parse(fs.readFileSync('./nicknames.json', `UTF8`));

client.on('message', async message => {
const enabled = nicks[message.guild.id].enabled;
const nickname = nicks[message.guild.id].nickname;
const seperator = nicks[message.guild.id].seperator;
const args = message.content.split(" ").slice(2).join(' ');
    let messageArray = message.content.split(" ");
   if(message.content.startsWith(prefix + "toggleNickname")) {
       if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply('You need Permissions.');
       if(!messageArray[1]) return message.reply('You Must supply a method.');
       if(messageArray[1] !== 'on' && messageArray[1] !== 'off' && messageArray[1] !== 'set' && messageArray[1] !== 'seperator') return message.reply('Choose one of the following: \n```xl\n1: On\n2: Off\n3: Set\n4: Seperator```');
       if(messageArray[1] === 'on') {
        message.reply('Preparing...').then(msg => {
        setTimeout(() => {
           msg.edit(':white_check_mark: Done!.'); 
        },5000);
    });
    nicks[message.guild.id] = {
      enabled: true,
    };
       } else if(messageArray[1] === 'off') {
           message.reply('Preparing...').then(msg => {
        setTimeout(() => {
           msg.edit(':white_check_mark: Done!.'); 
        },5000);
    });
    nicks[message.guild.id] = {
      enabled: false,
    };
    fs.writeFile("./nicknames.json", JSON.stringify(nicks), (err) => {
    if (err) console.error(err);
  });
       } else if(messageArray[1] === 'set') {
    if(!args) return message.reply('Supply the nickname.');
    if(args < 7) return message.reply('Nickname must be less than 7 letters');
    message.reply('Preparing...').then(msg => {
        setTimeout(() => {
           msg.edit(':white_check_mark: Done!.'); 
        },5000);
    });
    nicks[message.guild.id] = {
      enabled: enabled,
      nickname: args
    };
    fs.writeFile("./nicknames.json", JSON.stringify(nicks), (err) => {
    if (err) console.error(err);
  });
       } else if(messageArray[1] === 'seperator') {
           if(!messageArray[2]) return message.reply('Supply a seperator');
           if(seperator < 3) return message.reply('Seperator must be less than 3 letters.');
          message.reply('Preparing...').then(msg => {
        setTimeout(() => {
           msg.edit(':white_check_mark: Done!.'); 
        },5000);
    });
    nicks[message.guild.id] = {
        enabled: enabled,
        nickname: nickname,
        seperator: messageArray[2],
    };
    fs.writeFile("./nicknames.json", JSON.stringify(nicks), (err) => {
    if (err) console.error(err);
  });
       }
   } 
});

client.on('guildMemberAdd', member => {
    let enabled = nicks[member.guild.id].enabled;
    let nickname = nicks[member.guild.id].nickname;
    let seperator = nicks[member.guild.id].seperator;
    let username = client.users.get(member.id).username;
    if(enabled === true) {
        if(!seperator) return seperator === "|";
        if(!nickname) return nickname === "-";
        member.setNickname(`${nickname} ${seperator} ${username}`);
    } else if(enabled === false) {
        return undefined;
    }
});


client.on('message', message => {
        if (message.content === "+inv") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setAuthor(`『| ${message.author.username} |』`, message.author.avatarURL)      
        .setTitle(`اضغط هنا لدعوه البوت`)
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=518167388408250379&permissions=8&scope=bot`)
     message.channel.sendEmbed(embed);
       }
   });
 

   client.on("message", message => {
    if (message.content === "+help-general") {
           message.react("✅")
              message.react("❌")
     const embed = new Discord.RichEmbed() 
         .setColor("#ffff00")
         .setDescription(`

   
●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●


+id   → اي دي


+invites → عدد الدعوات


+info-server → معلومات عن السيرفر


+mcskins   → سكنات ماين كرافت


+member → لمعرفة عدد اعضاء السيرفر


+avatar   →شعار حسابك


+ser-av   →شعار السيرفر


+uptime →مدة التشغيل


رابط ← رابط النفايت بالسيرفر


+date    →التاريخ


+own   →صاحب البوت


+roll    →قرعة



●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●
  
    `)
  
  
      message.author.sendEmbed(embed)
      
      }
      }); 

 
   client.on("message", message => {
    if (message.content === "+help-admins") {
           message.react("✅")
              message.react("❌")
     const embed = new Discord.RichEmbed() 
         .setColor("#ffff00")
         .setDescription(`

   
●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●


+mute → اسكات عضو


+unmute   →تكلم عضو


+kick  →اخراج عضو


+gstar →للقيفاواي

+autorole →اوتورول


+clear → لمسح الشات


+ct <name> → صنع روم كتابي


+cv <name> → صنع روم صوتي


+bc → ارسال رسالة للجميع


●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●
  
    `)
   
      message.author.sendEmbed(embed)
      
      }
      }); 

 
   client.on("message", message => {
    if (message.content === "+help-support") {
           message.react("✅")
              message.react("❌")
     const embed = new Discord.RichEmbed() 
         .setColor("#ffff00")
         .setDescription(`

   
●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●


+inv → لدعوة البوت


+bot  →معلومات عن البوت


تحايات ادارة بوت و سيرفر SaVaGeS


●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●
  
    `)
   
      message.author.sendEmbed(embed)
      
      }
      }); 



client.on("message", message => {
    if (message.content === "+help-game") {
           message.react("✅")
              message.react("❌")
     const embed = new Discord.RichEmbed() 
         .setColor("#ffff00")
         .setDescription(`

●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●



عفوا بس الحين احنا شغالين على game نتمن منك ان تتفاعل في السيرفر انشاء الله



●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●


  
    `)
   
      message.author.sendEmbed(embed)
      
      }
      }); 




client.on('message', message => {

    if (message.author.bot) return;

     if (message.content === prefix + "help") {





 message.author.sendMessage(`
●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●


+help-general → مساعدة للجميع


+help-admins →مساعدة للإضارة 


+help-support →مساعدة لإضارة البوت


+help-game    →مساعدة للالعاب


+help-music  →مساعدة الاغاني




●▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬●
`);
     
     
  message.channel.send('**تم الرسال في الخاص**');
     
     }    
     });
 
 



client.login(process.env.BOT_TOKEN);


