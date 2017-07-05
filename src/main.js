const Spritesmith = require('spritesmith');
const mkdirp = require('mkdirp');
const template = require('art-template');
const fs = require('fs');
const path = require('path');
const images = require('images');

const pwd = process.cwd();

function createSprite(options){
    options.src = makeIconSrc(options.type,options.algorithm);
    options.remPx = 50; // iphone6 375 / 7.5
    if(!options.src.length){
        console.log('no found icons');
        return;
    }
    if(options.type == 2 && options.algorithm != 'top-down' && options.algorithm != 'left-right'){
        options.algorithm = 'top-down';
        console.log('mobile only select "top-down" or "left-right"');
    }
    //console.log(options,'options');
    Spritesmith.run(options,function(err,result){
        if(err){
            throw(err);
            return;
        }
        options.pngname = options.pngname || 'sprite';
        mkdirp.sync(path.join(pwd,'dist'));
        fs.writeFileSync(path.join(pwd,'dist')+'/'+options.pngname+'.png',result.image);
        // result.coordinates; result.properties;
        makeOutputFile(options,result);
        console.log('create success!');
    });
}

function makeOutputFile(opts,result){
    var data = {}, reg = /([a-zA-Z0-9_-]+)\.(?:png|jpg|gif|jpeg)$/i;
    data.rempx = opts.remPx;
    data.width = result.properties.width;
    data.height = result.properties.height;
    data.pngname = opts.pngname;
    data.items = [];
    data.type = opts.type;
    data.algorithm = opts.algorithm;

    for(var key in result.coordinates){
        var json = {};
        json.name = key.match(reg)[1];
        //json.value = JSON.stringify(result.coordinates[key]);
        json.value = result.coordinates[key];
        data.items.push(json);
    }

    //CSS SCSS JSON
    if(opts.type == 2){ // mobile
        var scss,json;
        var css = template(path.join(__dirname,'../template/mobileTpl.css'),data);
        fs.writeFileSync(path.join(pwd,'dist')+'/style.css',css);
        if(opts.sass){
            scss = template(path.join(__dirname,'../template/mobileTpl.scss'),data);
            fs.writeFileSync(path.join(pwd,'dist')+'/style.scss',scss);
        }
        if(opts.json){
            json = template(path.join(__dirname,'../template/template.json'),data);
        }
    }else{ // pc
        var tpl = template(path.join(__dirname,'../template/template.css'),data);
        var json;
        fs.writeFileSync(path.join(pwd,'dist')+'/style.css',tpl);
        if(opts.json){
            json = template(path.join(__dirname,'../template/template.json'),data);
            fs.writeFileSync(path.join(pwd,'dist')+'/style.json',json);
        }
        if(opts.sass){
            fs.writeFileSync(path.join(pwd,'dist')+'/style.scss',tpl);
        }
    }
}


function makeIconSrc(type,algorithm){
    let files = fs.readdirSync(pwd);
    let result = [],sizeArr = [],radioJson = {},setValue,setAttr;
    files.forEach(function(name){
        if(checkImg(name)){
            if(type == 2){
                let w = images(path.join(pwd,name)).size().width;
                let h = images(path.join(pwd,name)).size().height;
                if(algorithm == 'top-down'){
                    setAttr = 'width';
                    sizeArr.push(w);
                }else if(algorithm == 'left-right'){
                    setAttr = 'height';
                    sizeArr.push(h);
                }
                radioJson[name] = w/h;
            }
            result.push(path.join(pwd,name));
        }
    });
    setValue = minNumber(sizeArr);
    files.forEach(function(name){
        if(checkImg(name) && type == 2){
            if(setAttr == 'width'){
                images(path.join(pwd,name)).size(setValue).save(path.join(pwd,name),{
                    quality : 80
                });
            }else if(setAttr == 'height'){
                images(path.join(pwd,name)).size(radioJson[name]*setValue,setValue).save(path.join(pwd,name),{
                    quality : 80
                });
            }
        }
    });
    return result;
}

function minNumber(arr){
    var min = arr[0];
    arr.forEach(function(ele,index){
        if(ele < min){ min = ele;}
    });
    return min;
}

function checkImg(name){
    let reg = /.png|.jpg|.jpeg|.gif$/;
    return reg.test(name);
}


module.exports = createSprite
