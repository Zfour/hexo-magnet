/**
 * Hexo Magnet
 * Ice Kano
 */

function priority_magnet(){
    var priority = 0
    if(hexo.config.magnet.priority){
        priority = hexo.config.magnet.priority
    }
    else{
        priority = 0
    }
    return priority
}

hexo.extend.filter.register('after_generate',function() {
    var magnet = hexo.config.magnet.enable;
    if(magnet){
        var temple = hexo.config.magnet.temple_html.split("${temple_html_item}")
        var layout_name ='';
        var layout_type ='';
        var layout_index =0;
        layout_name = hexo.config.magnet.layout.name;
        layout_type = hexo.config.magnet.layout.type;
        layout_index =  hexo.config.magnet.layout.index;
        var get_layout = ''
        if (layout_type == 'class'){
            get_layout =  `document.getElementsByClassName('${layout_name}')[${layout_index}]`
        }else if (layout_type == 'id'){
            get_layout =  `document.getElementById('${layout_name}')`
        }else {
            get_layout =  `document.getElementById('${layout_name}')`
        }
        var data_list =[]
        var load_more_href = ''
        var categories_list= hexo.locals.get('categories').data;
        var tag_list = hexo.locals.get('tags').data;
        if(hexo.config.magnet.type ==='categories'){
            data_list = categories_list
            load_more_href = '/categories'
        }else if (hexo.config.magnet.type ==='tags'){
            data_list = tag_list
            load_more_href = '/tags'
        }
        var categories_new_list = [];
        var temple_html_item = '';
        if (hexo.config.magnet.devide>3){
            br_devide = '<br>'
        }else{
            br_devide =' '
        }
        var devide = 100 / hexo.config.magnet.devide;
        if(hexo.config.magnet.display){
            for (j of hexo.config.magnet.display){
                for (item of data_list){
                    if(j.name == item.name){
                        var item_group = {}
                        item_group[item.name]=item.length
                        categories_new_list.push(item_group)
                        if(j.icon===null){j.icon = ""}
                        temple_html_item += `<div class="magnet_item"><a class="magnet_link" href="${item.path}"><div class="magnet_link_context" style=""><span style="font-weight:500;flex:1">${j.icon} ${j.display_name}${br_devide}(${item.length})</span><span style="padding:0px 4px;border-radius: 8px;"><i class="fas fa-arrow-circle-right"></i></span></div></a></div>`;
                    }
                }
            }
        }
        else{
            for (item of data_list){
                var item_group = {}
                item_group[item.name]=item.length
                categories_new_list.push(item_group)
                temple_html_item += `<div class="magnet_item"><div style="display:flex;padding: 20px;font-size:16px;"><span style="font-weight:500;flex:1">${item.name} (${item.length})</span><span style="padding:0px 4px;border-radius: 8px;"><i class="fas fa-arrow-circle-right"></i></span></div></div>`;
            }
        }

        if((categories_new_list.length % hexo.config.magnet.devide)>0){
            for(var i=0;i<(hexo.config.magnet.devide-categories_new_list.length % hexo.config.magnet.devide);i++){
                temple_html_item += `<div class="magnet_item" style="visibility: hidden"></div>`
            }
        }
        var load_more = `<a class="magnet_link_more"  href="${load_more_href}" style="flex:1;text-align: center;margin-bottom: 10px;">查看更多...</a>`
        temple_html_item += load_more
        var temple_html =`${temple[0]}${temple_html_item}${temple[1]}`;
        var script_text = ` <script data-pjax>if(${get_layout} && location.pathname =='${hexo.config.magnet.enable_page}'){
    var parent = ${get_layout};
    var child = '${temple_html}';
    console.log('已挂载magnet')
    parent.insertAdjacentHTML("afterbegin",child)}
     </script><style>#catalog_magnet{flex-wrap: wrap;display: flex;width:100%;justify-content:space-between;padding: 10px 10px 0 10px;align-content: flex-start;}.magnet_item{flex-basis: calc(${devide}% - 5px);background: ${hexo.config.magnet.color_setting.background_color};margin-bottom: 10px;border-radius: 8px;transition: all 0.2s ease-in-out;}.magnet_item:hover{background: ${hexo.config.magnet.color_setting.background_hover_color}}.magnet_link_more{color:#555}.magnet_link{color:${hexo.config.magnet.color_setting.text_color}}.magnet_link:hover{color:${hexo.config.magnet.color_setting.text_hover_color}}@media screen and (max-width: 600px) {.magnet_item {flex-basis: 100%;}}.magnet_link_context{display:flex;padding: 10px;font-size:16px;transition: all 0.2s ease-in-out;}.magnet_link_context:hover{padding: 10px 20px;}</style>
    <style>${hexo.config.magnet.plus_style}</style>`;
        hexo.extend.injector.register('body_end',script_text, "default");
    }

},priority_magnet())
