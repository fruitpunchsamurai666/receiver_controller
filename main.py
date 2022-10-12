def on_button_pressed_a():
    radio.send_number(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_value(name, value):
    global x_humid, x_wind, x_light, x_temp, x_moist, x_weight
    if name == "humi":
        x_humid = value
        serial.write_value("x_humid", value)
    elif name == "winds":
        x_wind = value
        serial.write_value("x_wind", value)
    elif name == "light":
        x_light = value
        serial.write_value("x_light", value)
    elif name == "temp":
        x_temp = value
        serial.write_value("temperature", value)
    elif name == "mois":
        x_moist = value
        serial.write_value("moisture", value)
    elif name == "weight":
        t1 = 0
        x_weight = value
        serial.write_value("weight", value)
        t1 = w_moist * x_moist + w_weight * x_weight + w_temp * x_temp + w_humid * x_humid + w_wind * x_wind + w_light * x_light
        t2 = w_moist * x_moist + w_weight * x_weight + w_temp * x_temp + w_humid * x_humid + w_wind * x_wind + w_light * x_light + w_heater
        normal_t = (t1 * t2 - tt * t1) / (t2 - t1)
        heat_t = tt - normal_t
        t1_hr = Math.idiv(t1, 60)
        t1_min = t1 % 60
        t1_str = "" + str(t1_hr) + "hr " + ("" + str(t1_min)) + "min"
        basic.show_string(t1_str)
    elif name == "ID":
        serial.write_value("time", value)
    else:
        basic.show_icon(IconNames.HEART)
radio.on_received_value(on_received_value)

x_weight = 0
x_moist = 0
x_temp = 0
x_light = 0
x_wind = 0
x_humid = 0
tt = 0
w_heater = 0
w_light = 0
w_wind = 0
w_humid = 0
w_temp = 0
w_weight = 0
w_moist = 0
colorbit_51bit = None
t1_hr2 = 0
t1_min2 = 0
t1_str2 = ""
radio.set_group(60)
w_moist = 1
w_weight = 0
w_temp = 1
w_humid = 1
w_wind = 1
w_light = 1
w_heater = 1
target_time = 3
tt = target_time * 60
OLED12864_I2C.init(60)