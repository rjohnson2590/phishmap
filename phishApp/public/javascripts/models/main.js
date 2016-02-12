
var phishYearModel = Backbone.Model.extend({

    defaults : {

        data : ''

    },

    search : function() {
        var self = this;
        console.log('here');
        $.ajax({
                url: "http://phish.in/api/v1/years/2012",
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                }
            })
            .done(function( phishData ) {
                    var phishDataParsed = JSON.parse(phishData);
                    console.log('whatttt', self);
                    console.log( "Sample of data:", phishDataParsed);
                    self.attributes.data = phishDataParsed.data[0].location;
                    console.log(self.attributes.data);
            });

    }

})

var phishYear = new phishYearModel({});