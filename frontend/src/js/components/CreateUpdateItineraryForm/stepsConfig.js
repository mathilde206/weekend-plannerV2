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
                options: [ '$', '$$', '$$$', '$$$$' ]
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
                type: 'text'
            },
            {
                name: 'day2_lunch',
                label: 'Day 2 - Lunch',
                type: 'text'
            },
            {
                name: 'day2_afternoon',
                label: 'Day 2 - Afternoon',
                type: 'text'
            },
            {
                name: 'day2_diner',
                label: 'Day 2 - Diner',
                type: 'text'
            },

        ]);
    case 5:
        return ([
            {
                name: 'day3_morning',
                label: 'Day 3 - Morning',
                type: 'text'
            },
            {
                name: 'day3_lunch',
                label: 'Day 3 - Lunch',
                type: 'text'
            },
            {
                name: 'day3_afternoon',
                label: 'Day 3 - Afternoon',
                type: 'text'
            },
            {
                name: 'day1_diner',
                label: 'Day 3 - Diner',
                type: 'text'
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
                name: 'numberOfDays',
                label: 'Number of Days',
                type: 'select',
                options: [ 1, 2, 3 ]
            },
        ]);
    }
}
