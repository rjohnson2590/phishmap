
var phishYearResultView = Backbone.View.extend({

    el : $('.search-form'),

    render : function(){

        var yearData= this.model.get('data');
        this.$el.append('<div class = "search-result">' + yearData + '</div>');

    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);

    },

    events : {
        'click .input-button' : 'apiCall'

    },

    apiCall : function(){

        this.model.search($('.search-field-input')[0].value);
    }
})

var phishYearResult = new phishYearResultView({model: phishYear});

