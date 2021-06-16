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
                    lat: 50.82208,
                    lng: 12.93978,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene1.gltf',
        scale: '0.4 0.4 0.4',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
        position: '0 -1 1',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.07 0.07 0.07',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        position: '0 -1 1',
    },
    {
        url:'./assets/azeria/scene.gltf',
        scale: '0.07 0.07 0.07',
        rotation: '0 180 0',
        info: 'Azeria, Confused, HP 100/100',
        position: '0 -1 1',
    },
       {
        url:'./assets/jellyfish/scene.gltf',
        scale: '0.8 0.8 0.8',
        rotation: '0 180 0',
        position: '0 -1 1',
        info: '',
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
