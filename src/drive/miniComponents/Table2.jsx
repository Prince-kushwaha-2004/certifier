import React from 'react';
import toast from 'react-hot-toast';
import { apicall } from '../../../utils/services';
import * as constants from '../../constants';
import DropDown2 from '../miniComponents/DropDown2';
export default function Table2({ data, getData, setData }) {
    console.log(data)
    const starredFile = (id, type) => {
        apicall("patch", `file-manager/star/${type}/`, '', { "folder_id": id }, (data) => {
            getData()
            toast.success(data.status)
        })
    }
    if ((data.folders || data.files) && (data.folders.length || data.files.length)) {
        return (
            <div className="my-1.5 me-8 mb-40">
                <div className="min-w-full inline-block align-middle">
                    <div className="rounded-lg w-full overflow-scrool">
                        <table className="divide-y w-full divide-gray-200 ">
                            <thead className="bg-gray-50 dark:bg-neutral-700">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3 text-start ps-2 text-xs font-medium text-gray-500 dark:text-gray-50 uppercase"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-50 uppercase"
                                    >
                                        Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-50 uppercase "
                                    >
                                        Modified
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-3 text-end text-xs font-medium text-gray-500 dark:text-gray-50 uppercase "
                                    >
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                                {data.folders ? data.folders.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-sm font-medium flex items-center gap-2 cursor-pointer text-gray-800 dark:text-white" >
                                                <img src="https://pngimg.com/d/folder_PNG100467.png" className='w-6' alt="" /> {value.folder_name}
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-sm text-gray-800 dark:text-white ">
                                                {value.items} items
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-sm text-gray-800 dark:text-white ">
                                                {value.created_datetime__date}
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-end text-sm font-medium">
                                                <DropDown2 id={value.id} type={"folder"} getData={getData} setData={setData} prev_name={value.folder_name} />
                                            </td>
                                        </tr>
                                    )
                                }) : ''}
                                {data.files ? data.files.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >
                                                <a href={`${constants.BASEURL}download-zip?file_id=${value.id}`} className=" py-4 ps-2 whitespace-nowrap text-sm font-medium flex items-center gap-2 cursor-pointer text-gray-800 dark:text-white">
                                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-zip-file-format-icon-download-in-svg-png-gif-formats--document-export-archive-pack-files-folders-icons-489644.png" className='w-6' alt="" /> {value.filename}
                                                </a>
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-sm text-gray-800 dark:text-white ">
                                                {value.file_size}
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-sm text-gray-800 dark:text-white ">
                                                {value.created_datetime__date}
                                            </td>
                                            <td className=" py-4 ps-2 whitespace-nowrap text-end text-sm font-medium">
                                                <DropDown2 id={value.id} type={"file"} getData={getData} setData={setData} prev_name={value.filename} />
                                            </td>
                                        </tr>
                                    )
                                }) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    } else {


        return (
            <div className='w-full'>
                <h1 className='text-center text-4xl font-bold text-neutral-600 mt-40 dark:text-white'>Trash is Empty</h1>
            </div>
        )
    }
}
