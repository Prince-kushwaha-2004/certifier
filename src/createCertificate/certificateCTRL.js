import { useState } from 'react';
import toast from 'react-hot-toast';
import { apicall } from '../../utils/services';

export default function useCertificate() {
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

    return { showimage, boxstart, drawbox, boxstop, addField, changetitle, handleDelete, handleSubmit, clearform, changeAlign, isSelected, first, data, downloadLink, indexNo, boxstyle }
}
