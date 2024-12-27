const emailvalid = /^[*A-Za-z]{1,}[*A-Za-z0-9]{0,}[\.\_\-A-Za-z0-9][*A-Za-z0-9]{1,}@[A-Za-z]{2,}\.[^@\s\/.0-9]{2,5}$/i;
const passvalid = /^(?=.*[A-Z])(?=.*[!@#$&])(?=.*[0-9])(?=.*[a-z]).{8,16}$/i;
const addressvalid = /^[*A-Za-z0-9]{2}(?=.*[a-z])[*A-Za-z\.\- 0-9]{1,}$/i;
const namevalid = /^[A-Za-z][A-Za-z 0-9\.\,\(\)\']{1,}$/i;

export const validate = (type, data) => {
    if (type == "email") {
        if (emailvalid.test(data)) return { valid: true, message: "Email is valid" }
        else return { valid: false, message: "Enter a valid email" }
    } else if (type == "password") {
        if (passvalid.test(data)) return { valid: true, message: "password is valid" }
        else return { valid: false, message: "Weak Password, should include an upper case, a number, an special Symbol and should be of length between 8 to 16" }
    } else if (type == "name") {
        if (namevalid.test(data)) return { valid: true, message: "Name is valid" }
        else return { valid: false, message: "Enter a valid Name" }
    } else if (type == "address") {
        if (addressvalid.test(data)) return { valid: true, message: "Address is valid" }
        else return { valid: false, message: "Enter a valid address" }
    } else {
        return { valid: false, message: "Enter a valid type" }
    }
}