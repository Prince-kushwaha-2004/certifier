import React, { useState } from 'react';
import { BiSolidImageAdd } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from "react-icons/gr";
import { IoIosColorPalette } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { apicall } from '../../utils/services';
import Header2 from '../drive/header/Header2';
import Loader from '../loader/loader';
import useCertificate from './useCertificate';
export default function CreateCertificate() {
    let { showimage, boxstart, drawbox, boxstop, addField, changetitle, handleDelete, handleSubmit, clearform, changeAlign, changeFont, changeColor, isSelected, data, downloadLink, color, previewLink } = useCertificate()
    const [fonts, setFonts] = useState([])
    const { loading } = useSelector(state => state.loading)
    useState(() => {
        apicall("get", "generate-certificate/", '', '', (data) => {
            setFonts(data.fonts)
        })
    }, [])
    const [border, setBorder] = useState('border')
    return (
        <>
            <Header2 />
            <form action="" className='w-full  flex flex-col md:flex-row h-[55rem] border-t dark:bg-neutral-800 border-slate-300 dark:border-neutral-600' onSubmit={handleSubmit}>
                <div className='w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center items-center bg-white dark:bg-neutral-800 border-r border-gray-300 dark:border-neutral-600 overflow-hidden'>
                    <div className={isSelected ? 'flex flex-row-reverse w-full mr-8' : 'hidden'}>
                        <button type='button' className='bg-white hover:bg-red-600 hover:text-white hover:border-red-600 shadow border border-black  px-4 py-2 m-2 text-black font-bold rounded-full' onClick={clearform}>X</button>
                    </div>
                    <label htmlFor="image" className='overflow-hidden mt-4 rounded-xl border-slate-500 mx-8' style={!isSelected ? { cursor: "pointer" } : { cursor: "crosshair", border: "1px solid gray" }}>
                        <img src="" id='img' alt="" className={isSelected ? 'w-full h-full' : ""} onMouseDown={boxstart} onMouseMove={drawbox} onMouseUp={boxstop} />
                        <h1 className={isSelected ? 'hidden' : 'flex flex-col items-center justify-center border-2 border-gray-300 dark:border-neutral-600 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-neutral-700 hover:bg-gray-100 overflow-hidden p-16'}>
                            <svg className="w-12 h-12 mb-4 text-gray-500 dark:text-neutral-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-md text-gray-500 dark:text-neutral-300"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-sm text-gray-500 dark:text-neutral-300">PNG, JPG or JPEG (MAX 2MB)</p>
                        </h1>
                    </label>
                    {
                        data.map((value, index) => {
                            return (
                                <div key={index} className={`${border} box flex items-center justify-center rounded`} style={value.boxstyle ? value.boxstyle : { display: "none" }}><h1>{value.key}</h1></div>
                            )
                        })
                    }
                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 p-4 overflow-auto flex-1'>
                    <h1 className='text-2xl text-gray-500  dark:text-neutral-100 font-bold'>Create a custom Certificate</h1>
                    <div className='flex justify-end items-center flex-wrap'>
                        <div className='w-10 h-10  me-6 my-auto text-4xl text-gray-600 cursor-pointer'><IoSquareOutline className={`text-blue-300  border-black ${border}-2 rounded-lg bg-blue-300`} onClick={() => border == "border" ? setBorder('') : setBorder("border")} /></div>
                        <label htmlFor="color" className='w-10 h-10 my-auto text-4xl text-gray-600  dark:text-neutral-100 cursor-pointer'><IoIosColorPalette /></label>
                        <input type="color" id="color" value={color} className='w-10 dark:bg-neutral-800 h-10 my-auto mx-2 cursor-pointer' onChange={changeColor} />
                        <select name="cars" id="cars" className='bg-slate-100 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-200 focus:outline-none border my-auto px-3 py-2 rounded-lg border-blue-300' onChange={changeFont}>
                            {fonts.map((value) => { return (<option key={value.key} value={JSON.stringify(value)} style={{ fontFamily: value.font }}>{value.font}</option>) })}
                        </select>

                        <button className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg' type='button' onClick={addField}>AddField</button>
                        <button className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg text-xl' type='button' onClick={() => addField("image")}><BiSolidImageAdd /></button>

                    </div>
                    <div>
                        <input type="file" id='image' name='image' disabled={isSelected} className='hidden' accept="image/png, image/gif, image/jpeg" onChange={showimage} />
                    </div>
                    <div className='flex flex-col gap-4 '>
                        {
                            data.map((value, index) => {
                                return (
                                    value.type == "text" ?
                                        <div className='flex w-full gap-1' key={index}>
                                            <input type='text' index={index} className="w-full my-auto border font-semibold text-gray-500 border-gray-300 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-200 text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400 dark:focus:outline-neutral-600 " onChange={changetitle} value={value.key} placeholder="key" />

                                            <div className='flex border border-slate-300 dark:border-neutral-800 rounded-lg '>
                                                <label htmlFor={index + "left"} className='bg-gray-200 dark:bg-neutral-700 dark:text-white rounded-s-lg px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white' style={value.align == "left" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignLeft /></label>
                                                <input type="radio" checked={value.align == "left"} className='hidden' index={index} value="left" onChange={changeAlign} name={index + "align"} id={index + "left"} />

                                                <label htmlFor={index + "center"} className='bg-gray-200 dark:bg-neutral-700 dark:text-white px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white' style={value.align == "center" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignCenter /></label>
                                                <input type="radio" checked={value.align == "center"} className='hidden' index={index} value="center" onChange={changeAlign} name={index + "align"} id={index + "center"} />

                                                <label htmlFor={index + "right"} className='bg-gray-200 dark:bg-neutral-700 dark:text-white rounded-e-lg px-2 py-3 text-xl text-slate-700 hover:bg-blue-500 hover:text-white ' style={value.align == "right" ? { backgroundColor: "#3b82f6", color: "white" } : {}}><GrTextAlignRight /></label>
                                                <input type="radio" checked={value.align == "right"} className='hidden' index={index} value="right" onChange={changeAlign} name={index + "align"} id={index + "right"} />
                                            </div>

                                            <button index={index} className='bg-gray-200 border dark:bg-neutral-700 dark:text-white dark:border-neutral-800 border-slate-300 px-2 py-1 text-2xl text-slate-700 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded-lg' type='button' onClick={handleDelete}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={handleDelete} index={index}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            </button>
                                        </div>
                                        :
                                        <div className='flex w-full gap-1' key={index}>
                                            <input type='text' index={index} className="w-full my-auto border font-semibold text-gray-500 border-gray-300 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-200 text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400 dark:focus:outline-neutral-600 " onChange={changetitle} value={value.key} placeholder="key" />
                                            <input type="file" name={value.key} accept=".png" className="block w-full border border-gray-300 dark:border-neutral-800 rounded-lg text-md focus:z-10 focus:border-blue-500 dark:bg-neutral-700 dark:text-white focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4" />

                                            <button index={index} className='bg-gray-200 border dark:bg-neutral-700 dark:text-white dark:border-neutral-800 border-slate-300 px-2 py-1 text-2xl text-slate-700 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded-lg' type='button' onClick={handleDelete}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={handleDelete} index={index}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            </button>
                                        </div>

                                )
                            })
                        }
                        <div className={isSelected && data.length ? 'block' : 'hidden'}>
                            <label htmlFor="data" className="mx-2 text-slate-800 dark:text-neutral-300">Upload Data (csv, xls or xlsx)</label>
                            <input type="file" name="data" accept=".csv,.xlsx,.xls" id="data" className="block w-full border border-gray-300 dark:border-neutral-800 rounded-lg text-md focus:z-10 focus:border-blue-500 dark:bg-neutral-700 dark:text-white focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4" />

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
                            <a href={previewLink} target="_blank">
                                <button type='button' className='bg-blue-500 px-4 py-2 m-2 text-white rounded-lg flex items-center gap-2' ><FaImage /> Preview</button>
                            </a>
                        </div>
                        : null}
                </div>
            </form>
            <Loader loading={loading} />
        </>
    )
}
