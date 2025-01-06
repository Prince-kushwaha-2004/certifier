import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { GoDownload } from "react-icons/go";
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from "react-icons/gr";
import { apicall } from '../../utils/services';
import Header2 from '../drive/header/Header2';
export default function CreateCertificate() {
    const [isSelected, setIsSelected] = useState(false)
    const [first, setFirst] = useState(true)
    const [data, setData] = useState([])
    const [downloadLink, setDownloadLink] = useState(null)
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
    const boxstart = (event) => {
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
            } else {
                return value
            }
        })
        setData(newData)
    }
    const drawbox = (event) => {
        let x = (event.nativeEvent.offsetX / event.target.width) * event.target.naturalWidth
        let y = (event.nativeEvent.offsetY / event.target.height) * event.target.naturalHeight
        let newData = data.map((value, index) => {

            if (index == indexNo && !first) {
                let style = {
                    ...boxstyle,
                    width: `${event.clientX - boxstyle.leftno}px`,
                    height: `${event.clientY - boxstyle.topno}px`,
                    fontSize: `${event.clientY - boxstyle.topno}px`
                }
                setBoxstyle(style)
                return { ...value, x2: x, y2: y, boxstyle: style }
            } else {
                return value
            }
        })
        setData(newData)
    }
    const boxstop = (event) => {
        setFirst(true)
    }
    const addField = () => {
        if (!isSelected)
            return toast.error("Select an Image first")
        if (data.length > 0 && data[data.length - 1].x2 == 0)
            return toast.error("Select an area on image first!")
        setFirst(true)
        setData([...data, { key: "Input", align: "center", x1: 0, y1: 0, x2: 0, y2: 0 }])
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
            return { "key": value.key, "align": value.align, "x1": value.x1, "y1": value.y1, "x2": value.x2, "y2": value.y2 }
        })
        const result = Object.groupBy(newdata, ({ key }) => key);
        let finalData = []
        for (let key in result) {
            let d = {}
            d["key"] = key
            let boxes = []
            for (let b in result[key]) {
                boxes.push({ "align": result[key][b]["align"], "x1": result[key][b]["x1"], "y1": result[key][b]["y1"], "x2": result[key][b]["x2"], "y2": result[key][b]["y2"] })
            }
            d["boxes"] = boxes
            finalData.push(d)
        }
        formdata.set("format", JSON.stringify(finalData))

        console.log(finalData)

        apicall("post", undefined, "generate-certificate/", formdata, '', (data) => {
            console.log(data)
            let route = data.route
            setDownloadLink(`https://10.21.96.199:8000/certifier/${route}`)
            console.log(downloadLink)
            toast.success(data.status)
        })
        image.disabled = true
    }
    const clearform = () => {
        image.disabled = false
        document.forms[0].reset()
        setData([])
        document.querySelector("#img").setAttribute("src", "");
        setIsSelected(false)
    }
    const changeAlign = (event) => {
        console.log(event.target.value)
        let newData = data.map((value, index) => {
            if (event.target.attributes.index.value == index) {
                value.align = event.target.value
            }
            return value
        })
        setData(newData)
    }

    return (
        <>
            <Header2 />
            <form action="" className='w-full  flex flex-col md:flex-row h-[55rem]' onSubmit={handleSubmit}>
                <div className='w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center items-center bg-white border-r border-gray-300 overflow-hidden'>
                    <div className={isSelected ? 'flex flex-row-reverse w-full mr-8' : 'hidden'}>
                        <button type='button' className='bg-white hover:bg-red-600 hover:text-white hover:border-red-600 shadow border border-black  px-4 py-2 m-2 text-black font-bold rounded-full' onClick={clearform}>X</button>
                    </div>
                    <label htmlFor="image" className='overflow-hidden rounded-xl border-slate-500 mx-8' style={!isSelected ? { cursor: "pointer" } : { cursor: "crosshair", border: "1px solid gray" }}>
                        <img src="" id='img' alt="" className={isSelected ? 'w-full h-full' : ""} onMouseDown={boxstart} onMouseMove={drawbox} onMouseUp={boxstop} />
                        <h1 className={isSelected ? 'hidden' : 'flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden p-16'}>
                            <svg className="w-12 h-12 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-md text-gray-500 "><span className="font-semibold">Click to upload</span></p>
                            <p className="text-sm text-gray-500 ">PNG, JPG or JPEG (MAX 2MB)</p>
                        </h1>
                    </label>
                    {
                        data.map((value, index) => {
                            return (
                                <div key={index} className='border border-blue-600 text-blue-600 flex items-center justify-center rounded' style={value.boxstyle ? value.boxstyle : { display: "none" }}><h1>{value.key}</h1></div>
                            )
                        })
                    }

                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 p-4 overflow-auto flex-1'>
                    <h1 className='text-2xl text-gray-500 font-bold'>Create a custom Certificate</h1>
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
                                        <input type='text' index={index} className="w-full my-auto border font-semibold text-gray-500 border-gray-300 text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" onChange={changetitle} value={value.key} placeholder="key" />

                                        <div className='flex border border-slate-300 rounded-lg '>
                                            <label htmlFor={index + "left"} className='bg-gray-200 rounded-s-lg px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white' style={value.align == "left" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignLeft /></label>
                                            <input type="radio" checked={value.align == "left"} className='hidden' index={index} value="left" onChange={changeAlign} name={index + "align"} id={index + "left"} />

                                            <label htmlFor={index + "center"} className='bg-gray-200 px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white' style={value.align == "center" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignCenter /></label>
                                            <input type="radio" checked={value.align == "center"} className='hidden' index={index} value="center" onChange={changeAlign} name={index + "align"} id={index + "center"} />

                                            <label htmlFor={index + "right"} className='bg-gray-200 rounded-e-lg px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white ' style={value.align == "right" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignRight /></label>
                                            <input type="radio" checked={value.align == "right"} className='hidden' index={index} value="right" onChange={changeAlign} name={index + "align"} id={index + "right"} />
                                        </div>

                                        <button index={index} className='bg-gray-200 border border-slate-300 px-2 py-1 text-2xl text-slate-700 hover:bg-red-500 hover:text-white rounded-lg' type='button' onClick={handleDelete}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={handleDelete} index={index}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        </button>
                                    </div>
                                )
                            })
                        }
                        <div className={isSelected && data.length ? 'block' : 'hidden'}>
                            <label htmlFor="data" className="mx-2 text-slate-800">Upload Data (.csv)</label>
                            <input type="file" name="data" accept=".csv" id="data" className="block w-full border border-gray-300 rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4" />

                            <div className='flex flex-row-reverse'>
                                <button type='submit' className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg' >Generate</button>
                            </div>
                        </div>
                    </div>
                    {downloadLink ?
                        <div className='flex justify-center mt-8'>
                            <a href={downloadLink}>
                                <button type='button' className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg flex items-center gap-2' ><GoDownload /> Download</button>
                            </a>

                        </div>
                        : null}
                </div>
            </form>
        </>
    )
}
