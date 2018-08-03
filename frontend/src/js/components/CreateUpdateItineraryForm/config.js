export function getFieldsforStep(step) {
    switch (step) {
    case 1:
        return ([
            {
                name: 'city',
                label: 'City',
                type: 'text'
            },
            {
                name: 'country',
                label: 'Country',
                type: 'text'
            },
            {
                name: 'language',
                label: 'Language',
                type: 'text'
            },
            {
                name: 'currency',
                label: 'Currency',
                type: 'text'
            },
        ]);
    case 2:
        return ([
            {
                name: 'title',
                label: 'Title of your Itinerary',
                type: 'text'
            },
            {
                name: 'description',
                label: 'Short Description',
                type: 'textarea'
            },
            {
                name: 'budget',
                label: 'Budget',
                type: 'select',
                options: [ 'Cheap', 'Affordable', 'Expensive', 'Very Expensive' ]
            }
        ]);
    case 3:
        return ([
            {
                name: 'day1_morning',
                label: 'Day 1 - Morning',
                type: 'textarea'
            },
            {
                name: 'day1_lunch',
                label: 'Day 1 - Lunch',
                type: 'textarea'
            },
            {
                name: 'day1_afternoon',
                label: 'Day 1 - Afternoon',
                type: 'textarea'
            },
            {
                name: 'day1_diner',
                label: 'Day 1 - Diner',
                type: 'textarea'
            },

        ]);
    case 4:
        return ([
            {
                name: 'day2_morning',
                label: 'Day 2 - Morning',
                type: 'textarea'
            },
            {
                name: 'day2_lunch',
                label: 'Day 2 - Lunch',
                type: 'textarea'
            },
            {
                name: 'day2_afternoon',
                label: 'Day 2 - Afternoon',
                type: 'textarea'
            },
            {
                name: 'day2_diner',
                label: 'Day 2 - Diner',
                type: 'textarea'
            },

        ]);
    case 5:
        return ([
            {
                name: 'day3_morning',
                label: 'Day 3 - Morning',
                type: 'textarea'
            },
            {
                name: 'day3_lunch',
                label: 'Day 3 - Lunch',
                type: 'textarea'
            },
            {
                name: 'day3_afternoon',
                label: 'Day 3 - Afternoon',
                type: 'textarea'
            },
            {
                name: 'day3_diner',
                label: 'Day 3 - Diner',
                type: 'textarea'
            },

        ]);
    case 6:
        return ([ {
            name: 'image',
            label: 'Upload An Image',
            type: 'file',
        } ]);

    default:
        return ([
            {
                name: 'city',
                label: 'City',
                type: 'text'
            },
            {
                name: 'number_of_days',
                label: 'Number of Days',
                type: 'select',
                options: [ 1, 2, 3 ]
            },
        ]);
    }
}

export function getDescriptionforSteps(step) {
    switch (step) {
    case 1:
        return ([
            'First, we need some information about the city',
        ]);
    case 2:
        return([
            'Great, now please say a bit more about the type of trip you want to create.'
        ]);
    case 3:
    case 4:
    case 5:
        return([
            'Now it\'s time to give your recommendation.',
            'You can write anything you want, like what to visit and where to eat/drink.'
        ]);
    case 6:
        return([
            'Last step, you can add a photo to illustrate your itinerary.',
            'Please make sure that you have the right to share that photo.'
        ]);
    case 0:
    default:
        return ([
            'Thank you for sharing your traveling tips with the community.',
            'To begin, please enter the city and the number of days for your itinerary.'
        ]);
    }};


export function validate() {

}