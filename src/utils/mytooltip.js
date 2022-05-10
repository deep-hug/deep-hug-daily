var $ = require('jquery');
export default {
    mounted() {
        this.$nextTick(() => {
            var newtitle = '';
            // TODO:不要忘记做这个事情
            // HACK:这里有些不确定
            // NOTE:添加一些说明
            // INFO:Hi
            // TAG:标记一下
            // XXX:随便写写啦
            // BUG:这里有毒
            // FIXME:修复我
            $('span.mytooltip')
                .mouseover(function(e) {
                    newtitle = this.title;
                    this.title = '';
                    if (newtitle != '') {
                        $('body').append('<div id="mytitle" >' + newtitle + '</div>');
                    }
                    $('#mytitle')
                        .css({
                            left: e.pageX + 'px',
                            top: e.pageY + 'px',
                        })
                        .show();
                })
                .mouseout(function() {
                    this.title = newtitle;
                    $('#mytitle').remove();
                })
                .mousemove(function(e) {
                    $('#mytitle')
                        .css({
                            left: e.pageX + 10 + 'px',
                            top: e.pageY + 10 + 'px',
                        })
                        .show();
                });
        });
    },
};
