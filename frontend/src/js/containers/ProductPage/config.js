const productPackagesConfig = [
    {
        description: 'With this package, you will receive an itinerary tailored to your preferences. ' +
        'The recommendation will include activities, restaurants and general information about the city.',
        image: '/static/images/basicPackage.jpg',
        name: 'Basic Package',
        productListName: 'basicProducts'

    },
    {
        description: 'The Premium package includes the full basic package but adds recommendations for' +
        ' hotels and flights, as well as the best period to visit the city.',
        image: '/static/images/premiumPackage.jpg',
        name: 'Premium Package',
        productListName: 'premiumProducts'
    },
    {
        description: 'With the Deluxe Package, you don\'t need to plan anything. Not only will you receive a ' +
        'detailed itinerary, your agent will also take care to book flights and hotels, as well as any other required reservation',
        image: '/static/images/deluxePackage.jpg',
        name: 'Deluxe Package',
        productListName: 'deluxeProducts'
    },
];

export default productPackagesConfig;
