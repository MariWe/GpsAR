window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Change';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                    lat: 50.82198,
                    lng: 12.93959,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene1.gltf',
        scale: '0.3 0.3 0.3',
         location: {
                lat: 50.82211,
                lng: 12.93981,
        },
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.05 0.05 0.05',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url:'./assets/azeria/scene.gltf',
        scale: '0.05 0.05 0.05',
        rotation: '0 180 0',
        info: 'Azeria, Confused, HP 100/100',
    },
       {
        url:'./assets/jellyfish/scene.gltf',
        scale: '0.3 0.3 0.3',
        rotation: '0 180 0',
        info: 'No water?!',
    },
      {
        url:'./assets/trex/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        info: 'ROOOAAAAR!',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
