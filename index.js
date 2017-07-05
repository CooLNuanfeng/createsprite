#!/usr/bin/env node
const program = require('commander');
const createSprite = require('./src/main');
const package = require('./package');

program.version(package.version)
    .usage('create mobile|pc')
    .option('-c, --css','output css file')
    .option('-s, --sass','output sass file')
    .option('-j, --json','output json file');

program
    .command('create <type> [options...]')
    .description('create pc or mibile sprite image and styles')
    .action(function(type,options){
        let padding,algorithm;
        if(type!='mobile' && type!='pc'){
            console.log('Parameter Error. <type> must be mobile or pc');
            return;
        }
        if(options.length){
            padding = Number(options[0]) ? Number(options[0]) : null;
            algorithm = options[1];
        }
        let params = {
            'type' : type == 'pc' ? 1 : 2,
            'sass' : program.sass ? true : false,
            'json' : program.json ? true : false,
            'padding' : padding ? padding : 5,
            'algorithm' : algorithm ? algorithm : 'top-down'
        };
        //console.log(params);
        createSprite(params);
    });


program.on('--help',function(){
    console.log('');
    console.log('  Example: ');
    console.log('');
    console.log('  $ sprite create mobile -s');
    console.log('');
});


program.parse(process.argv);
if(!program.args.length){
    program.help();
}
