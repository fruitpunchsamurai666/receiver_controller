input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
    _function = 1
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(1)
    _function = 2
})
radio.onReceivedValue(function (name, value) {
    if (name == "humi") {
        x_humid = value
        serial.writeValue("x_humid", value)
    } else if (name == "winds") {
        x_wind = value
        serial.writeValue("x_wind", value)
    } else if (name == "light") {
        x_light = value
        serial.writeValue("x_light", value)
    } else if (name == "temp") {
        x_temp = value
        serial.writeValue("temperature", value)
    } else if (name == "mois") {
        x_moist = value
        serial.writeValue("moisture", value)
    } else if (name == "weight") {
        t1 = 0
        x_weight = value
        serial.writeValue("weight", value)
        t1 = w_moist * x_moist + w_weight * x_weight + w_temp * x_temp + w_humid * x_humid + w_wind * x_wind + w_light * x_light
        if (_function == 1) {
            t1_hr = Math.idiv(t1, 60)
            t1_min = t1 % 60
            t1_str = "" + t1_hr + "hr " + ("" + t1_min) + "min"
            basic.showString(t1_str)
        } else {
            t2 = w_moist * x_moist + w_weight * x_weight + w_temp * x_temp + w_humid * x_humid + w_wind * x_wind + w_light * x_light + w_heater
            if (t2 > tt) {
                basic.showIcon(IconNames.Sad)
            } else {
                normal_t = (t1 * t2 - tt * t1) / (t2 - t1)
                heat_t = tt - normal_t
                basic.showString("" + (tt))
                basic.showString("" + (normal_t))
                basic.showString("" + (heat_t))
            }
        }
    }
})
let heat_t = 0
let normal_t = 0
let t2 = 0
let t1_str = ""
let t1_min = 0
let t1_hr = 0
let x_weight = 0
let t1 = 0
let x_moist = 0
let x_temp = 0
let x_light = 0
let x_wind = 0
let x_humid = 0
let _function = 0
let tt = 0
let w_heater = 0
let w_light = 0
let w_wind = 0
let w_humid = 0
let w_temp = 0
let w_weight = 0
let w_moist = 0
let colorbit_51bit = null
let t1_hr2 = 0
let t1_min2 = 0
let t1_str2 = ""
radio.setGroup(60)
w_moist = 1
w_weight = 0
w_temp = 1
w_humid = 1
w_wind = 1
w_light = 1
w_heater = 1
let target_time = 3
tt = target_time * 60
OLED12864_I2C.init(60)
