
var phishYearResultView = Backbone.View.extend({

    el : $('.search-form'),

    render : function(){
        console.log('render');
        var yearData= this.model.get('data');
        this.el.append('<div class = "search-result">' + yearData + '</div>');

    },

    initialize: function () {
        this.model.on('change', this.render, this);
        console.log('init',this);
    },

    events : {
        'click .input-button' : 'apiCall'

    },

    apiCall : function(){
        console.log('whatisT', this);
        console.log('howdy');
        this.model.search();
    }
})

var phishYearResult = new phishYearResultView({model: phishYear});
