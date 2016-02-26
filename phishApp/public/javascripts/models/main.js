
var phishYearModel = Backbone.Model.extend({

    defaults : {

        data : ''

    },

    search : function(year) {
        var self = this;

        $.ajax({
                url: "http://phish.in/api/v1/years/"+ year +"",
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                }
            })
            .done(function( phishData ) {
                var phishDataParsed = JSON.parse(phishData);
                //phishDataParsed.data.forEach(function(e,i){
                //    self.set('data', e.location);
                //});
                console.log('data',phishDataParsed);
                self.set('data',phishDataParsed.data[0].location );
                for (var i=0; i<phishDataParsed.data.length ; i++ ){
                    self.map(phishDataParsed.data[i].location);
                }

            });
    },

    map : function(coordinates){
        $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ coordinates +"&key=AIzaSyAWVdwwYaifvHtZSbG6AKI1IF5HwLPzeHw",
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                }
            })
            .done(function(phishCor){
                console.log('newPhishData', JSON.parse(phishCor));
                var phishCorParsed = JSON.parse(phishCor),
                     lat = phishCorParsed.results[0].geometry.location.lat,
                     lng = phishCorParsed.results[0].geometry.location.lng;
                     map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: {lat: lat, lng: lng}
                });

                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map,
                    title: 'Hello World!'
                });
            });
    }

});

var phishYear = new phishYearModel({});
