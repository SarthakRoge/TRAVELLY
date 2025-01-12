import { FaDollarSign, FaMoneyBillWave, FaGem, FaUser, FaHeart, FaHome, FaUsers } from 'react-icons/fa';
export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        description:'A sole traveles in exploration',
        icon: '🧍🏻',
        people:'1'

    },
    {
        id:2,
        title: 'A Couple',
        description: 'Two travelers in tandem',
        icon: '❤️',
        people:'2 people'

    },
    {
        id:3,
        title: 'Family',
        description: 'A group of fun loving adventurers',
        icon: '🏡',
        people:'3 to 5 people'

    },
    {
        id:4,
        title: 'Friends',
        description: 'A bunch of thrill-seekers',
        icon: '👩🏻‍👧🏻‍👦🏻',
        people:'5 to 10 people'

    },

]

export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        description: 'Stay consious of cost',
        icon:'💵' 
    },
    {
        id:2,
        title: 'Moderate',
        description: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        description: "Don't worry about cost",
        icon: '💎',
    }
    
]

export const AI_PROMPT="Generate Travel Plan for location: {location}, for {totalDays} Days for {traveler}with a {budget}budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  Include day-wise plans with bestTimeToVisit, theme for the day, and places (name, details, image URL, geo-coordinates, ticket pricing, rating, and time to travel). Ensure the itinerary is realistic and well-structured. in JSON format\""