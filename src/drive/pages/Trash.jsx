import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { apicall } from '../../../utils/services';
import EmptyTrash from '../miniComponents/EmptyTrash';
import Table2 from '../miniComponents/Table2';
export default function Trash() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    console.log(id)
    const getData = () => {
        apicall("get", "file-manager/trash/", '', '', (data) => {
            setData(data)
        })
    }

    useEffect(() => {
        getData()
    }, [id])
    return (
        <div className='px-8'>
            <div className='flex justify-between font-bold mb-8'>
                {data.parent_folder == null ?
                    <Link to="/home">
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'><FaAngleLeft className='text-xl' /> Go Back </button>
                    </Link>
                    :
                    <Link to={`/home/Folders/${data.parent_folder}`}>
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'><FaAngleLeft className='text-xl' /> Go Back </button>
                    </Link>
                }
                <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'
                    onClick={() => setOpen(true)}
                >Empty Trash <FaTrash /></button>

            </div>
            <Table2 data={data} getData={getData} setData={setData} />
            <EmptyTrash open={open} setOpen={setOpen} getData={getData} setData={setData} />
        </div >
    )
}
