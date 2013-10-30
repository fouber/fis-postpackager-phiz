/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function(ret){ //打包后处理
    fis.util.map(ret.src, function(subpath, file){
        if(file.isMod && file.rExt === '.php'){
            var clazzFile = ret.src[subpath.replace(/(?=\.php$)/i, '.class')];
            if(clazzFile){
                var res = ret.map.res[ file.getId() ];
                if(res){
                    res.extend = clazzFile.getId();
                    if(clazzFile.extras && clazzFile.extras.clazz){
                        var content = file.getContent().replace(/ extends [a-zA-Z_][a-zA-Z_0-9]* /, ' extends ' + clazzFile.extras.clazz + ' ');
                        file.setContent(content);
                    } else {
                        fis.log.error('undefined class name of file[' + clazzFile.subpath + ']');
                    }
                } else {
                    fis.log.error('unable to get resource [' + id + '] in map');
                }
            }
        }
    });
};