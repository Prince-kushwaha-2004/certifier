import { useState } from 'react';
import toast from 'react-hot-toast';
import { apicall } from '../../utils/services';
import * as constants from '../constants';

export default function useCertificate() {
    const [isSelected, setIsSelected] = useState(false)
    const [first, setFirst] = useState(true)
    const [data, setData] = useState([])
    const [downloadLink, setDownloadLink] = useState(null)
    const [previewLink, setPreviewLink] = useState(null)
    const [indexNo, setIndexNo] = useState(-1)
    const [boxstyle, setBoxstyle] = useState({})
    const [font, setFont] = useState({ key: 1, font: 'Fira Sans Condensed' })
    const [color, setColor] = useState('#000000')
    const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]

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
        let x = Math.round((event.nativeEvent.offsetX / event.target.width) * event.target.naturalWidth)
        let y = Math.round((event.nativeEvent.offsetY / event.target.height) * event.target.naturalHeight)
        let newData = data.map((value, index) => {
            if (index == indexNo && first) {
                setFirst(false)
                let style = {
                    position: "absolute",
                    left: `${event.clientX}px`,
                    top: `${event.clientY}px`,
                    leftno: event.clientX,
                    topno: event.clientY,
                    fontFamily: font.font,
                    color: color,
                    borderColor: color
                }
                setBoxstyle(style)
                return { ...value, x1: x, y1: y, font: font.key, color: color, boxstyle: style }
            } else {
                return value
            }
        })
        setData(newData)
    }
    const drawbox = (event) => {
        let x = Math.round((event.nativeEvent.offsetX / event.target.width) * event.target.naturalWidth)
        let y = Math.round((event.nativeEvent.offsetY / event.target.height) * event.target.naturalHeight)
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
    const addField = (type) => {
        if (!isSelected)
            return toast.error("Select an Image first")
        if (data.length > 0 && data[data.length - 1].x2 == 0)
            return toast.error("Select an area on image first!")
        setFirst(true)
        if (type == "image") {
            setData([...data, { key: "Image", align: "center", "font": font.key, color: color, x1: 0, y1: 0, x2: 0, y2: 0, type: "image" }])
            setIndexNo(indexNo + 1)
        } else {
            setData([...data, { key: "Input", align: "center", "font": font.key, color: color, x1: 0, y1: 0, x2: 0, y2: 0, type: "text" }])
            setIndexNo(indexNo + 1)
        }

    }
    const changetitle = (event) => {
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
        if (!allowedTypes.includes(csv.files[0].type)) {
            return toast.error("Wrong formate Select .CSV or .XLSX")
        }
        let image = document.getElementById('image')
        image.disabled = false
        const formdata = new FormData(document.forms[0])
        let newdata = data.map((value) => {
            return { "key": value.key, "align": value.align, "font": value.font, "color": value.color, "x1": value.x1, "y1": value.y1, "x2": value.x2, "y2": value.y2, "type": value.type }
        })
        const result = Object.groupBy(newdata, ({ key }) => key);
        let finalData = []
        console.log(result)
        for (let key in result) {
            let d = {}
            d["key"] = key
            d["type"] = result[key][0]["type"]
            let boxes = []
            for (let b in result[key]) {
                boxes.push({ "color": result[key][b]["color"], "font": result[key][b]["font"], "align": result[key][b]["align"], "x1": result[key][b]["x1"], "y1": result[key][b]["y1"], "x2": result[key][b]["x2"], "y2": result[key][b]["y2"] })
            }
            d["boxes"] = boxes
            finalData.push(d)
        }
        formdata.set("format", JSON.stringify(finalData))
        console.log("finaldata", JSON.stringify(finalData))
        apicall("post", "generate-certificate/", formdata, '', (data) => {
            console.log(data)
            let route = data.route
            let preview = data.preview
            setDownloadLink(`${constants.BASEURL}${route}?file_id=${data.file_id}`)
            setPreviewLink(`${constants.BASEURL}${preview}`)
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
        setDownloadLink(null)
        setIndexNo(-1)
    }
    const changeAlign = (event) => {
        console.log(event.target.value)
        let newData = data.map((value, index) => {
            if (event.target.attributes.index.value == index) {
                value.align = event.target.value
                value.boxstyle = { ...value.boxstyle, justifyContent: event.target.value }
            }
            return value
        })
        setData(newData)
    }
    const changeFont = (event) => {
        setFont(JSON.parse(event.target.value))
        console.log(JSON.parse(event.target.value))
        if (indexNo + 1) {
            let newData = data.map((value, index) => {
                if (indexNo == index && value.boxstyle) {
                    value.boxstyle = { ...value.boxstyle, fontFamily: JSON.parse(event.target.value).font }
                    value = { ...value, font: JSON.parse(event.target.value).key }
                }
                return value
            })
            setData(newData)
        }

    }
    const changeColor = (event) => {
        setColor(event.target.value)
        if (indexNo + 1) {
            let newData = data.map((value, index) => {
                if (indexNo == index && value.boxstyle) {
                    value.boxstyle = { ...value.boxstyle, color: event.target.value, borderColor: event.target.value }
                    value = { ...value, color: event.target.value }
                }
                return value
            })
            setData(newData)
        }

    }
    return { showimage, boxstart, drawbox, boxstop, addField, changetitle, handleDelete, handleSubmit, clearform, changeAlign, changeFont, changeColor, isSelected, data, downloadLink, color, previewLink }
}
