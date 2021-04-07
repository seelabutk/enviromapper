function createPopup(li) {
    return L.npmap.layer.geojson({
        name: li._latin + '_observations',
        url: 'https://nps-grsm.cartodb.com/api/v2/sql?filename=' + li._latin + '&format=geojson&q=SELECT+DISTINCT+ON+(the_geom)+*+FROM+grsm_species_observations_maxent+WHERE+lower(genus_speciesmaxent)=lower(%27' + li._latin + '%27)',
        type: 'geojson',
        popup: {
            title: 'Common: ' + li._common.replace(/_/g, ' ') + "<br>"
                + 'Latin: ' + li._latin.replace(/_/g, ' '),
            description: 'This observation was recorded on '
                + '{{dateretrieved}}, at {{lon}}&#176;, {{lat}}&#176;, {{elevation}} feet '
                + 'in {{parkdistrict}}. It is best accessed by {{road}} and {{trail}}.<br><br>'
                + 'Download observations: '
                + '<a href="https://nps-grsm.cartodb.com/api/v2/sql?filename=' + li._latin + '&format=csv&q=SELECT+DISTINCT+ON+(the_geom)+*+FROM+grsm_species_observations_maxent+WHERE+lower(genus_speciesmaxent)=lower(%27' + li._latin + '%27)">CSV</a> | '
                + '<a href="https://nps-grsm.cartodb.com/api/v2/sql?filename=' + li._latin + '&format=kml&q=SELECT+DISTINCT+ON+(the_geom)+*+FROM+grsm_species_observations_maxent+WHERE+lower(genus_speciesmaxent)=lower(%27' + li._latin + '%27)">KML</a> | '
                + '<a href="https://nps-grsm.cartodb.com/api/v2/sql?filename=' + li._latin + '&format=geojson&q=SELECT+DISTINCT+ON+(the_geom)+*+FROM+grsm_species_observations_maxent+WHERE+lower(genus_speciesmaxent)=lower(%27' + li._latin + '%27)">GeoJSON</a> | '
                + '<a href="https://nps-grsm.cartodb.com/api/v2/sql?filename=' + li._latin + '&format=shp&q=SELECT+DISTINCT+ON+(the_geom)+*+FROM+grsm_species_observations_maxent+WHERE+lower(genus_speciesmaxent)=lower(%27' + li._latin + '%27)">SHP</a>'
                + '<br><br><a target="_blank" href="https://www.nps.gov/grsm/learn/nature/research.htm">Contribute to this dataset</a>'
        },
        tooltip: li._common.replace(/_/g, ' '),
        styles: {
            point: {
                'marker-color': '#1d909b',
                'marker-size': 'medium'
            }
        },
        cluster: {
            clusterIcon: '#1d909b'
        },
        disableClusteringAtZoom: 15,
        polygonOptions: {
            color: '#1d909b',
            fillColor: '#1d909b'
        }
    });
}
