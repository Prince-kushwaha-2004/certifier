import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { GoDownload } from "react-icons/go";
import { apicall } from '../../utils/services';
export default function CreateCertificate() {
    const [isSelected, setIsSelected] = useState(false)
    const [first, setFirst] = useState(true)
    const [data, setData] = useState([])
    const [downloadLink, setdownloadLink] = useState(null)
    const [indexNo, setIndexNo] = useState(-1)
    const [boxstyle, setBoxstyle] = useState({})
    const showimage = (e) => {
        let input = e.target
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector("#img").setAttribute("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
            setIsSelected(true)
        }
    }
    const getcordinate = (event) => {
        console.log(event.clientX, event.clientY)
        let x = (event.nativeEvent.offsetX / event.target.width) * event.target.naturalWidth
        let y = (event.nativeEvent.offsetY / event.target.height) * event.target.naturalHeight
        let newData = data.map((value, index) => {
            if (index == indexNo && first) {
                setFirst(false)
                let style = {
                    position: "absolute",
                    left: `${event.clientX}px`,
                    top: `${event.clientY}px`,
                    leftno: event.clientX,
                    topno: event.clientY
                }
                setBoxstyle(style)
                return { ...value, x1: x, y1: y, boxstyle: style }
            } else if (index == indexNo) {
                let style = {
                    ...boxstyle,
                    width: `${event.clientX - boxstyle.leftno}px`,
                    height: `${event.clientY - boxstyle.topno}px`
                }
                setBoxstyle(style)
                return { ...value, x2: x, y2: y, boxstyle: style }
            } else {
                return value
            }
        })
        setData(newData)
    }
    const addField = () => {
        if (!isSelected)
            return toast.error("Select an Image first")
        if (data.length > 0 && data[data.length - 1].x2 == 0)
            return toast.error("Select an area on image first!")
        setFirst(true)
        setData([...data, { key: "Input", x1: 0, y1: 0, x2: 0, y2: 0 }])
        setIndexNo(indexNo + 1)
        console.log(data)
    }
    const changetitle = (event) => {
        console.log(event.target.attributes.index.value, event.target.value)
        let newData = data.map((value, index) => {
            if (index == event.target.attributes.index.value) {
                return { ...value, key: event.target.value }
            } else {
                return value
            }
        })
        setData(newData)
    }
    const handleDelete = (event) => {
        let newData = data.filter((value, index) => {
            return event.target.attributes.index.value != index
        })
        setIndexNo(indexNo - 1)
        setData(newData)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isSelected)
            return toast.error("No image selected")
        if (data.length == 0)
            return toast.error("No Field selected")
        if (data[data.length - 1].x2 == 0)
            return toast.error("Select an area on image first!")
        let csv = document.getElementById('data')
        if (csv.files.length == 0)
            return toast.error("Select Data in CSV formate")
        let image = document.getElementById('image')
        image.disabled = false
        const formdata = new FormData(document.forms[0])
        let newdata = data.map((value) => {
            return { "key": value.key, "x1": value.x1, "y1": value.y1, "x2": value.x2, "y2": value.y2 }
        })
        formdata.set("format", JSON.stringify(newdata))
        console.log(newdata)

        apicall("post", undefined, "generate-certificate/", formdata, '', (data) => {
            console.log(data)
            toast.success("hii")
        })
        image.disabled = true
    }
    const clearform = () => {
        image.disabled = false
        document.forms[0].reset()
        setData([])
        document.querySelector("#img").setAttribute("src", "https://t4.ftcdn.net/jpg/05/54/44/73/360_F_554447399_mbN5BZnaBj6apySYnREvSGssX02rbVcQ.jpg");
        setIsSelected(false)
    }
    return (
        <>
            <form action="" className='w-full  flex flex-col md:flex-row h-full ' onSubmit={handleSubmit}>
                <div className='w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center items-center bg-white border-r border-slate-500'>
                    <div className={isSelected ? 'flex flex-row-reverse w-full mr-8' : 'hidden'}>
                        <button type='button' className='bg-white hover:bg-red-600 hover:text-white hover:border-red-600 shadow border border-black  px-4 py-2 m-2 text-black font-bold rounded-full' onClick={clearform}>X</button>
                    </div>
                    <label htmlFor="image" className='border overflow-hidden rounded-xl border-slate-500 mx-8' style={!isSelected ? { cursor: "pointer" } : { cursor: "crosshair" }}>
                        <img src="https://t4.ftcdn.net/jpg/05/54/44/73/360_F_554447399_mbN5BZnaBj6apySYnREvSGssX02rbVcQ.jpg" id='img' alt="" onClick={getcordinate} />
                        <h1 className={isSelected ? 'hidden' : 'text-2xl font-bold text-center p-4'}>Upload a Template</h1>
                    </label>

                    {
                        data.map((value, index) => {
                            return (
                                <div key={index} className='border border-blue-600 text-blue-600 flex justify-center items-center rounded ' style={value.boxstyle ? value.boxstyle : { display: "none" }}>{value.key}</div>
                            )
                        })
                    }
                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 p-4 overflow-auto flex-1'>
                    <h1 className='text-2xl text-slate-700 font-bold'>Create a custom Certificate</h1>
                    <div className='flex flex-row-reverse'>
                        <button className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg' type='button' onClick={addField}>AddField</button>
                    </div>
                    <div>
                        <input type="file" id='image' name='image' disabled={isSelected} className='hidden' accept="image/png, image/gif, image/jpeg" onChange={showimage} />
                    </div>
                    <div className='flex flex-col gap-4 '>
                        {
                            data.map((value, index) => {
                                return (
                                    <div className='flex w-full gap-1' key={index}>
                                        <input type='text' index={index} className="w-full my-auto border  border-slate-500 text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" onChange={changetitle} value={value.key} placeholder="key" />
                                        <button index={index} className='bg-blue-500 px-4 py-2 text-white rounded-lg' type='button' onClick={handleDelete}>Delete</button>
                                    </div>
                                )
                            })
                        }
                        <div className={isSelected && data.length ? 'block' : 'hidden'}>
                            <label htmlFor="data" className="mx-2 text-slate-800">Upload Data (.csv)</label>
                            <input type="file" name="data" accept=".csv" id="data" className="block w-full border border-slate-500 rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4" />

                            <div className='flex flex-row-reverse'>
                                <button type='submit' className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg' >Generate</button>
                            </div>
                        </div>
                    </div>
                    {downloadLink ?
                        <div className='flex justify-center mt-8'>
                            <button className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg flex items-center gap-2' ><GoDownload /> Download</button>
                        </div>
                        : null}
                </div>
            </form>
        </>
    )
}
