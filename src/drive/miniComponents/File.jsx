import React from 'react';

export default function File(props) {
    return (
        <div className='cursor-pointer w-28 h-[5.8rem] flex items-center justify-center mt-4 flex-col relative'>
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-zip-file-format-icon-download-in-svg-png-gif-formats--document-export-archive-pack-files-folders-icons-489644.png" alt="folder" className='w-full h-full' />
            <p className='px-2 text-lg text-center dark:text-gray-50'>{props.folderName}</p>
        </div>
    )
}
