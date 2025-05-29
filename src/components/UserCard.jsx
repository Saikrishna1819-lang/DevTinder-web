import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,age,gender,about,photourl}=user
    
    
  return (
     <div className="bg-base-300 w-[230px]  rounded-lg">
            <div className="w-full">
                <img className="w-full  rounded-t-lg" src={photourl}  alt="profile-photo"></img>
            </div>
            <div className="p-5 flex flex-col gap-2 w-full">
                <div className="font-medium text-lg break-words">{firstName+" "+lastName}</div>
                <div>
                    <div>{age}</div>
                    <div>{gender}</div>
                </div>
                <div className='break-words'>{about}</div>
                
                <div className="flex gap-5">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Ignore</button>
                    <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded">Intrested</button>
                </div>
            </div>
        </div>
  )
}

export default UserCard