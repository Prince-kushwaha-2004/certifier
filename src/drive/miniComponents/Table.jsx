import React from 'react'

export default function Table() {
    return (

        <div className="my-1.5 me-8">
            <div className="min-w-full inline-block align-middle">
                <div className="rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                >
                                    Size
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 text-start text-xs font-medium text-gray-500 uppercase "
                                >
                                    Modified
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 text-end text-xs font-medium text-gray-500 uppercase "
                                >

                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                            <tr>
                                <td className=" py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2 text-gray-800">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-zip-file-format-icon-download-in-svg-png-gif-formats--document-export-archive-pack-files-folders-icons-489644.png" className='w-6' alt="" /> Innotech.zip
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    2.25 MB
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    10 Dec 2024
                                </td>
                                <td className=" py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className=" py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2 text-gray-800">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-zip-file-format-icon-download-in-svg-png-gif-formats--document-export-archive-pack-files-folders-icons-489644.png" className='w-6' alt="" /> IEE.zip
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    2.25 MB
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    10 Dec 2024
                                </td>
                                <td className=" py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className=" py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2 text-gray-800">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-zip-file-format-icon-download-in-svg-png-gif-formats--document-export-archive-pack-files-folders-icons-489644.png" className='w-6' alt="" /> IWOC.zip
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    2.25 MB
                                </td>
                                <td className=" py-4 whitespace-nowrap text-sm text-gray-800 ">
                                    10 Dec 2024
                                </td>
                                <td className=" py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
