import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { apicall } from '../../../utils/services';
import EmptyTrash from '../miniComponents/EmptyTrash';
import Table2 from '../miniComponents/Table2';
export default function Trash() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    const [searchedData, setSearchedData] = useState({})
    const { text } = useSelector(state => state.search)
    console.log(id)
    const getData = () => {
        apicall("get", "file-manager/trash/", '', '', (data) => {
            setData(data)
            setSearchedData(data)
        })
    }
    const search = () => {
        let newData = data;
        if (newData.files) {
            let newFiles = newData.files.filter((value) => {
                return (value.filename.toUpperCase().includes(text.toUpperCase()))
            })
            let newFolder = newData.folders.filter((value) => {
                return (value.folder_name.toUpperCase().includes(text.toUpperCase()))
            })
            setSearchedData({ ...data, files: newFiles, folders: newFolder })
            console.log(newFolder)
        }
        if (text == "") {
            setSearchedData(data)
        }
    }
    useEffect(() => {
        search()
    }, [text])
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
            <Table2 data={searchedData} getData={getData} setData={setData} />
            <EmptyTrash open={open} setOpen={setOpen} getData={getData} setData={setData} />
        </div >
    )
}
