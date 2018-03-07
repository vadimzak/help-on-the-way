export default {
    groups: [
        {
            legend: "פרטי התיקון",
            fields: [
                {
                    type: "input",
                    inputType: "text",
                    label: "מה התקלקל?",
                    model: "details.brokenItem"
                },
                {
                    type: "input",
                    inputType: "text",
                    label: "תיאור הבעיה",
                    model: "details.description"
                },{
                    type: "input",
                    inputType: "text",
                    label: "באיזה איזור של הבית זה נמצא?",
                    model: "details.area"
                },{
                    type: "number",
                    label: "עלות משוערת",
                    model: "details.cost",
                },{
                    type: "radios",
                    label: "מי משלם?",
                    model: "color",
                    values: [
                        {name: 'ע״ח הזקן', value:"elder_pays"},
                        {name: 'ע״ח המתנדב', value:"volunteer_pays"},
                    ]
                },{
                    type: "radios",
                    label: "מי משלם?",
                    model: "color",
                    values: [
                        {name: 'ע״ח הזקן', value:"elder_pays"},
                        {name: 'ע״ח המתנדב', value:"volunteer_pays"},
                    ]
                }
            ]
        }
    ]
}