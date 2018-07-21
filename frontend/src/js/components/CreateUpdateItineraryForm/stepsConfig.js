export function getFieldsforStep(step) {
    switch (step) {
    case 0:
        return ([
            {
                name: 'city',
                label: 'City',
                type: 'text'
            },
            {
                name: 'number_of_days',
                label: 'Number of Days',
                type: 'text'
            },
        ]);
    case 1:
        return ([
            {
                name: 'title',
                label: 'Title of your Itinerary',
                type: 'text'
            },
            {
                name: 'description',
                label: 'Short Description',
                type: 'text'
            },
            {
                name: 'description',
                label: 'Short Description',
                type: 'text'
            },
            {
                budget: 'budget',
                label: 'Budget',
                type: 'select',
                options: [ '$', '$$', '$$$', '$$$$' ]
            },
            {
                budget: 'image',
                label: 'Upload An Image',
                type: 'file',
            }
        ]);
    case 2:
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
    case 3:
        return ([
            {
                name: 'day1_morning',
                label: 'Day 1 - Morning',
                type: 'text'
            },
            {
                name: 'day1_lunch',
                label: 'Day 1 - Morning',
                type: 'text'
            },
            {
                name: 'day1_afternoon',
                label: 'Day 1 - Afternoon',
                type: 'text'
            },
            {
                name: 'day1_diner',
                label: 'Day 1 - Diner',
                type: 'text'
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
                label: 'Day 2 - Morning',
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
                label: 'Day 3 - Morning',
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
    }
}

export function mapInitialAnswerToSteps(days, city) {

}