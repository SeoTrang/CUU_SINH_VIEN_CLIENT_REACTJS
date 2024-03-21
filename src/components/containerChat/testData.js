
const dataMes = [
    {
        id: 1,
        content: 'hello',
        type: 'text',
        room_id: 1,
        user_id: 1,
        user:{
            id: 1,
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
            name: 'John',
        },
        sent: '08:30 15/12/2023'
    },
    {
        id: 2,
        content: [
            'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
            'https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg'
        ],
        type: 'images',
        reply_to: null,
        room_id: 1,
        user_id: 2,
        user:{
            id: 2,
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg',
            name: 'trang',
        },
        sent: '08:30 15/12/2023'
    },
    {
        id: 3,
        content: [
            'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
        ],
        type: 'images',
        room_id: 1,
        reply_to: 2,
        user_id: 1,
        user:{
            id: 1,
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
            name: 'John',
        },
        sent: '08:30 15/12/2023'
    },
    {
        id: 4,
        content: [
            'http://localhost:5000/1.mp4'
        ],
        type: 'videos',
        room_id: 3,
        reply_to: 2,
        user_id: 2,
        user:{
            id: 2,
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
            name: 'trang',
        },
        sent: '08:30 15/12/2023'
    },
    {
        id: 5,
        content: [
            'http://localhost:5000/1.mp4',
            'http://localhost:5000/1.mp4'
        ],
        type: 'videos',
        room_id: 3,
        reply_to: null,
        user_id: 2,
        user:{
            id: 2,
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
            name: 'trang',
        },
        sent: '08:30 15/12/2023'
    }
]

export default dataMes;