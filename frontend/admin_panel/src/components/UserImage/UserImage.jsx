import React from 'react';

const UserImage = () => {
  return (
    <span className="userImage flex w-12 h-12 overflow-hidden cursor-pointer rounded-full">
      <img
        src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
        alt="userImage"
        className='w-full h-full object-cover'
      />
    </span>
  );
}

export default UserImage;
