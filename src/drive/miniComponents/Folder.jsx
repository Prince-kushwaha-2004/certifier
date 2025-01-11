import React from 'react';

export default function Folder(props) {
    return (
        <div className='cursor-pointer w-32 flex flex-col relative'>
            <img src="https://pngimg.com/d/folder_PNG100467.png" alt="folder" className='w-full' />
            <p className='px-2 text-lg text-center dark:text-gray-50'>{props.folderName}</p>
        </div>
    )
}
