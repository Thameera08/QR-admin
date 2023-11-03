export const userColumns = [{field: "id" , headerName: "ID" , width:70} ,{
    field: "user" , headerName:"user" , width:230 , renderCell: (params)=>{
        return(
            <div className="cellWidthImg">
                <img className="cellImg" src={params.row.img}  alt="avtar"/>
                {params.row.username}
            </div>
        );
    },
    
    
},
{
    field:"email" , headerName:"Email" ,width:230,
},

{
    field:"age",
    headerName:"Age",
    width:100,
},

{
    field:"status",
    headerName:"Status",
    width:160,

    renderCell:(params) => {
        return(
            <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div>
        )
    }
}

];


export const userRows = [
    {
        id: 1,
        username: 'Sandaru De Silva',
        img: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: "Active",
        email: 'john@example.com',
        age: 23,
      },
      {
        id: 2,
        username: 'Kaveesha Adithya',
        img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: "Inactive",
        email: 'jane@example.com',
        age: 22,
      },
      {
        id: 3,
        username: 'Nadun Malinda',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: "Active",
        email: 'bob@example.com',
        age: 23,
      },

      {
        id: 4,
        username: 'Pramila Krishan',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: "Pending",
        email: 'bob@example.com',
        age: 22,
      },

      {
        id: 5,
        username: 'Malaka Aruna',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: "Active",
        email: 'bob@example.com',
        age: 24,
      },

      {
        id: 6,
        username: 'Chamika Sabaragamuwa',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: 'Inactive',
        email: 'bob@example.com',
        age: 22,
      },

      {
        id: 7,
        username: 'Chamika Sabaragamuwa',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: 'Inactive',
        email: 'bob@example.com',
        age: 22,
      },

      {
        id: 8,
        username: 'Chamika Sabaragamuwa',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: 'Inactive',
        email: 'bob@example.com',
        age: 22,
      },

      {
        id: 9,
        username: 'Chamika Sabaragamuwa',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: 'Inactive',
        email: 'bob@example.com',
        age: 22,
      },

      {
        id: 10,
        username: 'Chamika Sabaragamuwa',
        img: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        status: 'Inactive',
        email: 'bob@example.com',
        age: 22,
      },

      
]