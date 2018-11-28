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

STEBINnew paste 

Guest User
-

Untitled
 A GUEST   NOV 18TH, 2018   115   NEVER

Not a member of Pastebin yet? Sign Up, it unlocks many cool features!
rawdownloadreport text 3.52 KB
var fs = require('fs')
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


let ar = JSON.parse(fs.readFileSync(`AutoRole.json`, `utf8`))
client.on('message', message => {
  var sender = message.author
 
if(!message.guild) return
  if(!ar[message.guild.id]) ar[message.guild.id] = {
  onoff: 'On',
  role: '"EverYone»'
  }
 
if(message.content.startsWith(`+autorole`)) {
         
  let perms = message.member.hasPermission(`MANAGE_ROLES`)
 
  if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
 let args = message.content.split(" ").slice(1)
 if(!args.join(" ")) return message.reply(`${prefix}autorole toggle / set [ROLE NAME]`)
 let state = args[0]
 if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
   if(state.trim().toLowerCase() == 'toggle') {
    if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
    if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
   }
  if(state.trim().toLowerCase() == 'set') {
  let newRole = message.content.split(" ").slice(2).join(" ")
  if(!newRole) return message.reply(`${prefix}autorole set [ROLE NAME]`)
    if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
   ar[message.guild.id].role = newRole
    message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
  }
        }
if(message.content === '+info') {
   let perms = message.member.hasPermission(`MANAGE_GUILD`)
   if(!perms) return message.reply(`You don't have permissions.`)
    var embed = new Discord.RichEmbed()
 
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
 
 
    .setColor(`BLUE`)
    message.channel.send({embed})
  }
 
 
    fs.writeFile("./AutoRole.json", JSON.stringify(ar), (err) => {
    if (err) console.error(err)
  });
 
 
});


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

 


client.on('message', message => {
    if (message.content.startsWith("+invites")) {
      if(!message.member.hasPermission('SEND_MESSAGES')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `SEND_MESSAGES`' )      .then(m => m.delete(5000));
    message.guild.fetchInvites()
    .then(invites => message.channel.send(` You invited To this Server     ---->   ------>    ------>      =====>      [${invites.find(invite => invite.inviter.id === message.author.id).uses}]       <=====     <-------   <-----   <----    `))
         
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

  let command = message.content.split(" ")[0];

  if (command === "+mute") {

          if(!message.channel.guild) return message.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');

                  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **");

  let user = message.mentions.users.first();

  let modlog = client.channels.find('name', 'console');

  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

  if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").catch(console.error);

  if (!modlog) return message.reply("**لا يوجد الروم المراد ارسال المعلومات له 'Mute-Log'**");

  if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **');

  const embed = new Discord.RichEmbed()

    .setColor(0x00AE86)

    .addField(' Mute ', ' | :white_check_mark: |')

    .addField('تم اعطاء الميوت ل', `${user.username}#${user.discriminator} `)

    .addField('السبب', '**تعكير نظام الشات**')

    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

   message.channel.send({embed: embed});



  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);



  if (message.guild.member(user).roles.has(muteRole.id)) {

      client.channels.get(modlog.id).send({embed}).catch(console.error);

  } else {

    message.guild.member(user).addRole(muteRole).then(() => {

      client.channels.get(modlog.id).send({embed}).catch(console.error);

    });

  }



};

    if (command === "+unmute") {

          if(!message.channel.guild) return message.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **");

  let user = message.mentions.users.first();

  let modlog = client.channels.find('name', 'console');

  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

  if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **");

  if (!modlog) return message.reply("**لا يوجد الروم المراد ارسال المعلومات له 'console'**");

  if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **');

  const embed = new Discord.RichEmbed()

    .setColor(0x00AE86)

    .addField('UnMute ', ' | :white_check_mark: |')

    .addField('تم فك المي����ت عن', `${user.username}#${user.discriminator} `)

    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

   message.channel.send({embed: embed});



  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **');



  if (message.guild.member(user).removeRole(muteRole.id)) {

      client.channels.get(modlog.id).send({embed});

  } else {

    message.guild.member(user).removeRole(muteRole).then(() => {

      client.channels.get(modlog.id).send({embed});

    });

  }



};





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
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=462639598615658496&permissions=133659715&scope=bot`)
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


